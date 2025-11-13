import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Card, useTheme} from 'react-native-paper';
import {dummySongs, dummyPlaylists, Song, Playlist} from '../data/dummyData';
import {usePlayer} from '../contexts/PlayerContext';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const {playSong} = usePlayer();

  const handlePlaySong = (song: Song) => {
    playSong(song, dummySongs);
  };

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    }
  };

  const renderSongItem = ({item}: {item: Song}) => (
    <Card
      style={styles.songItem}
      onPress={() => handlePlaySong(item)}
      mode="contained">
      <View style={styles.songContent}>
        <Image source={{uri: item.artwork}} style={styles.songArtwork} />
        <View style={styles.songInfo}>
          <Text style={[styles.songTitle, {color: theme.colors.onSurface}]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.songArtist, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
            {item.artist}
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderPlaylistItem = ({item}: {item: Playlist}) => (
    <Card
      style={styles.playlistCard}
      onPress={() => handlePlayPlaylist(item)}
      mode="elevated">
      <Card.Cover source={{uri: item.artwork}} style={styles.playlistArtwork} />
      <Card.Content style={styles.playlistContent}>
        <Text style={[styles.playlistName, {color: theme.colors.onSurface}]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.playlistDescription, {color: theme.colors.onSurfaceVariant}]} numberOfLines={2}>
          {item.description}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView 
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      contentContainerStyle={{paddingBottom: insets.bottom + 80}}>
      <Text style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>Recently Played</Text>
      <FlatList
        data={dummySongs.slice(0, 4)}
        renderItem={renderSongItem}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />

      <Text style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>Your Playlists</Text>
      <FlatList
        data={dummyPlaylists}
        renderItem={renderPlaylistItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.playlistContainer}
      />

      <Text style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>Recommended</Text>
      <FlatList
        data={dummySongs.slice(4)}
        renderItem={renderSongItem}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
  },
  songItem: {
    marginBottom: 12,
  },
  songContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  songArtwork: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  songInfo: {
    flex: 1,
    marginLeft: 12,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  songArtist: {
    fontSize: 14,
  },
  playlistContainer: {
    paddingBottom: 16,
  },
  playlistCard: {
    width: 160,
    marginRight: 16,
  },
  playlistArtwork: {
    height: 136,
    borderRadius: 8,
  },
  playlistContent: {
    paddingTop: 12,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  playlistDescription: {
    fontSize: 12,
  },
});

export default HomeScreen;
