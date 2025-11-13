export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  artwork: string;
  url: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  artwork: string;
  songs: Song[];
}

export interface Album {
  id: string;
  name: string;
  artist: string;
  artwork: string;
  year: number;
  songs: Song[];
}

// Dummy audio URLs (using free sample audio)
export const dummySongs: Song[] = [
  {
    id: '1',
    title: 'Summer Vibes',
    artist: 'The Cool Band',
    album: 'Summer Hits 2024',
    duration: 245,
    artwork: 'https://picsum.photos/seed/song1/400/400',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Midnight Dreams',
    artist: 'Dream Makers',
    album: 'Night Sessions',
    duration: 198,
    artwork: 'https://picsum.photos/seed/song2/400/400',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Electric Soul',
    artist: 'The Cool Band',
    album: 'Electric Dreams',
    duration: 267,
    artwork: 'https://picsum.photos/seed/song3/400/400',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '4',
    title: 'Sunset Boulevard',
    artist: 'Indie Waves',
    album: 'City Lights',
    duration: 223,
    artwork: 'https://picsum.photos/seed/song4/400/400',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: '5',
    title: 'Neon Nights',
    artist: 'Dream Makers',
    album: 'Night Sessions',
    duration: 201,
    artwork: 'https://picsum.photos/seed/song5/400/400',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: '6',
    title: 'Ocean Waves',
    artist: 'Nature Sounds',
    album: 'Relaxation',
    duration: 312,
    artwork: 'https://picsum.photos/seed/song6/400/400',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
  {
    id: '7',
    title: 'Jazz in the Park',
    artist: 'Smooth Jazz Collective',
    album: 'Park Sessions',
    duration: 278,
    artwork: 'https://picsum.photos/seed/song7/400/400',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
  {
    id: '8',
    title: 'Mountain Echo',
    artist: 'Indie Waves',
    album: 'City Lights',
    duration: 189,
    artwork: 'https://picsum.photos/seed/song8/400/400',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
];

export const dummyPlaylists: Playlist[] = [
  {
    id: 'p1',
    name: 'My Favorites',
    description: 'Your most played songs',
    artwork: 'https://picsum.photos/seed/playlist1/400/400',
    songs: [dummySongs[0], dummySongs[2], dummySongs[4], dummySongs[6]],
  },
  {
    id: 'p2',
    name: 'Chill Vibes',
    description: 'Relax and unwind',
    artwork: 'https://picsum.photos/seed/playlist2/400/400',
    songs: [dummySongs[1], dummySongs[5], dummySongs[7]],
  },
  {
    id: 'p3',
    name: 'Workout Mix',
    description: 'High energy tracks',
    artwork: 'https://picsum.photos/seed/playlist3/400/400',
    songs: [dummySongs[2], dummySongs[3], dummySongs[6]],
  },
  {
    id: 'p4',
    name: 'Road Trip',
    description: 'Perfect for long drives',
    artwork: 'https://picsum.photos/seed/playlist4/400/400',
    songs: [dummySongs[0], dummySongs[3], dummySongs[4], dummySongs[7]],
  },
];

export const dummyAlbums: Album[] = [
  {
    id: 'a1',
    name: 'Summer Hits 2024',
    artist: 'The Cool Band',
    artwork: 'https://picsum.photos/seed/album1/400/400',
    year: 2024,
    songs: [dummySongs[0]],
  },
  {
    id: 'a2',
    name: 'Night Sessions',
    artist: 'Dream Makers',
    artwork: 'https://picsum.photos/seed/album2/400/400',
    year: 2023,
    songs: [dummySongs[1], dummySongs[4]],
  },
  {
    id: 'a3',
    name: 'Electric Dreams',
    artist: 'The Cool Band',
    artwork: 'https://picsum.photos/seed/album3/400/400',
    year: 2024,
    songs: [dummySongs[2]],
  },
  {
    id: 'a4',
    name: 'City Lights',
    artist: 'Indie Waves',
    artwork: 'https://picsum.photos/seed/album4/400/400',
    year: 2023,
    songs: [dummySongs[3], dummySongs[7]],
  },
];
