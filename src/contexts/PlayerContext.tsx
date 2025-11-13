import React, {createContext, useContext, useState, ReactNode, useEffect, useRef, useCallback} from 'react';
import {Audio} from 'expo-av';
import {Song} from '../data/dummyData';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  queue: Song[];
  playSong: (song: Song, queue?: Song[]) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  skipToNext: () => Promise<void>;
  skipToPrevious: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  addToQueue: (song: Song) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({children}) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const loadRequestIdRef = useRef<number>(0);

  // Configure audio mode
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
  }, []);

  // Update progress
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    
    if (isPlaying && soundRef.current) {
      progressInterval.current = setInterval(async () => {
        const status = await soundRef.current?.getStatusAsync();
        if (status && status.isLoaded) {
          setProgress(Math.floor(status.positionMillis / 1000));
          setDuration(Math.floor((status.durationMillis || 0) / 1000));
          
          if (status.didJustFinish) {
            setIsPlaying(false);
            // Skip to next song when current finishes
            const currentIndex = queue.findIndex((s) => s.id === currentSong?.id);
            if (currentIndex >= 0 && currentIndex < queue.length - 1) {
              const nextSong = queue[currentIndex + 1];
              if (soundRef.current) {
                await soundRef.current.unloadAsync();
                soundRef.current = null;
              }
              const {sound} = await Audio.Sound.createAsync(
                {uri: nextSong.url},
                {shouldPlay: true}
              );
              soundRef.current = sound;
              setCurrentSong(nextSong);
              setProgress(0);
              setIsPlaying(true);
            }
          }
        }
      }, 500);
    }
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, queue, currentSong]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const playSong = async (song: Song, newQueue?: Song[]) => {
    // Increment the request ID to invalidate previous requests
    loadRequestIdRef.current += 1;
    const currentRequestId = loadRequestIdRef.current;

    try {
      // Stop and unload previous sound
      if (soundRef.current) {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          await soundRef.current.stopAsync();
        }
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // Check if this request is still valid
      if (loadRequestIdRef.current !== currentRequestId) {
        console.log('Song loading cancelled (newer request):', song.title);
        return;
      }

      const queueToUse = newQueue || [song];
      setQueue(queueToUse);
      setCurrentSong(song);
      setProgress(0);
      setIsPlaying(false);

      // Load and play new sound
      console.log('Loading audio:', song.url);
      const {sound} = await Audio.Sound.createAsync(
        {uri: song.url},
        {shouldPlay: true},
        (status) => {
          if (status.isLoaded) {
            setDuration(Math.floor((status.durationMillis || 0) / 1000));
          }
        }
      );

      // Check again if this request is still valid
      if (loadRequestIdRef.current !== currentRequestId) {
        // This loading was superseded, unload the sound
        await sound.unloadAsync();
        console.log('Song loading cancelled after load:', song.title);
        return;
      }

      soundRef.current = sound;
      setIsPlaying(true);
      console.log('Playing:', song.title);
    } catch (error) {
      console.error('Error playing song:', error);
    }
  };

  const pause = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resume = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const skipToNext = useCallback(async () => {
    try {
      const currentIndex = queue.findIndex((s) => s.id === currentSong?.id);
      if (currentIndex >= 0 && currentIndex < queue.length - 1) {
        await playSong(queue[currentIndex + 1], queue);
      }
    } catch (error) {
      console.error('Error skipping to next:', error);
    }
  }, [queue, currentSong]);

  const skipToPrevious = useCallback(async () => {
    try {
      const currentIndex = queue.findIndex((s) => s.id === currentSong?.id);
      if (currentIndex > 0) {
        await playSong(queue[currentIndex - 1], queue);
      }
    } catch (error) {
      console.error('Error skipping to previous:', error);
    }
  }, [queue, currentSong]);

  const seekTo = async (pos: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(pos * 1000);
      setProgress(pos);
    }
  };

  const addToQueue = async (song: Song) => {
    const newQueue = [...queue, song];
    setQueue(newQueue);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        duration,
        queue,
        playSong,
        pause,
        resume,
        skipToNext,
        skipToPrevious,
        seekTo,
        addToQueue,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
