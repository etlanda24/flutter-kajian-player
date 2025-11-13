import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IconButton, Surface, useTheme, ProgressBar} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import {usePlayer} from '../contexts/PlayerContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const PlayerScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    pause,
    resume,
    skipToNext,
    skipToPrevious,
    seekTo,
  } = usePlayer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentSong) {
    return (
      <View style={[styles.container, {paddingBottom: insets.bottom}]}>
        <Text style={[styles.noSongText, {color: theme.colors.onSurfaceVariant}]}>
          No song playing
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {
      paddingTop: insets.top + 20,
      paddingBottom: Math.max(insets.bottom, 20),
      backgroundColor: theme.colors.background
    }]}>
      {/* Artwork with Material 3 elevation */}
      <Surface style={styles.artworkContainer} elevation={4}>
        <Image source={{uri: currentSong.artwork}} style={styles.artwork} />
      </Surface>

      {/* Song Info */}
      <View style={styles.infoContainer}>
        <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={2}>
          {currentSong.title}
        </Text>
        <Text style={[styles.artist, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
          {currentSong.artist}
        </Text>
        <Text style={[styles.album, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
          {currentSong.album}
        </Text>
      </View>

      {/* Progress Slider */}
      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration || 1}
          value={progress}
          onSlidingComplete={seekTo}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.surfaceVariant}
          thumbTintColor={theme.colors.primary}
        />
        <View style={styles.timeContainer}>
          <Text style={[styles.timeText, {color: theme.colors.onSurfaceVariant}]}>
            {formatTime(progress)}
          </Text>
          <Text style={[styles.timeText, {color: theme.colors.onSurfaceVariant}]}>
            {formatTime(duration)}
          </Text>
        </View>
      </View>

      {/* Playback Controls - Material 3 Style */}
      <View style={styles.controlsContainer}>
        <IconButton
          icon="skip-previous"
          iconColor={theme.colors.onSurface}
          size={36}
          onPress={skipToPrevious}
        />

        <Surface
          style={[styles.playButton, {backgroundColor: theme.colors.primary}]}
          elevation={3}>
          <IconButton
            icon={isPlaying ? 'pause' : 'play'}
            iconColor={theme.colors.onPrimary}
            size={48}
            onPress={isPlaying ? pause : resume}
          />
        </Surface>

        <IconButton
          icon="skip-next"
          iconColor={theme.colors.onSurface}
          size={36}
          onPress={skipToNext}
        />
      </View>

      {/* Additional controls */}
      <View style={[styles.additionalControls, {marginBottom: insets.bottom > 0 ? 0 : 16}]}>
        <IconButton
          icon="shuffle-variant"
          iconColor={theme.colors.onSurfaceVariant}
          size={24}
          onPress={() => {}}
        />
        <IconButton
          icon="heart-outline"
          iconColor={theme.colors.onSurfaceVariant}
          size={24}
          onPress={() => {}}
        />
        <IconButton
          icon="repeat"
          iconColor={theme.colors.onSurfaceVariant}
          size={24}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  artworkContainer: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
  },
  artwork: {
    width: width - 80,
    height: width - 80,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  artist: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 4,
  },
  album: {
    fontSize: 14,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 24,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  playButton: {
    borderRadius: 40,
    marginHorizontal: 8,
  },
  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  noSongText: {
    fontSize: 18,
  },
});

export default PlayerScreen;
