import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SegmentedButtons, Card, useTheme} from 'react-native-paper';
import {dummyPlaylists, dummyAlbums, Playlist, Album} from '../data/dummyData';
import {usePlayer} from '../contexts/PlayerContext';

const LibraryScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState<'playlists' | 'albums'>(
    'playlists',
  );
  const {playSong} = usePlayer();

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0], playlist.songs);
    }
  };

  const handlePlayAlbum = (album: Album) => {
    if (album.songs.length > 0) {
      playSong(album.songs[0], album.songs);
    }
  };

  const renderPlaylistItem = ({item}: {item: Playlist}) => (
    <Card
      style={styles.item}
      onPress={() => handlePlayPlaylist(item)}
      mode="contained">
      <View style={styles.itemContent}>
        <Image source={{uri: item.artwork}} style={styles.artwork} />
        <View style={styles.itemInfo}>
          <Text style={[styles.itemTitle, {color: theme.colors.onSurface}]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[styles.itemSubtitle, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
            Playlist • {item.songs.length} songs
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderAlbumItem = ({item}: {item: Album}) => (
    <Card
      style={styles.item}
      onPress={() => handlePlayAlbum(item)}
      mode="contained">
      <View style={styles.itemContent}>
        <Image source={{uri: item.artwork}} style={styles.artwork} />
        <View style={styles.itemInfo}>
          <Text style={[styles.itemTitle, {color: theme.colors.onSurface}]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[styles.itemSubtitle, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
            {item.artist} • {item.year}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.tabContainer, {borderBottomColor: theme.colors.surfaceVariant}]}>
        <SegmentedButtons
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value as 'playlists' | 'albums')}
          buttons={[
            {value: 'playlists', label: 'Playlists'},
            {value: 'albums', label: 'Albums'},
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      {selectedTab === 'playlists' ? (
        <FlatList
          data={dummyPlaylists}
          renderItem={renderPlaylistItem}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.listContainer, {paddingBottom: insets.bottom + 80}]}
        />
      ) : (
        <FlatList
          data={dummyAlbums}
          renderItem={renderAlbumItem}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.listContainer, {paddingBottom: insets.bottom + 80}]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    padding: 16,
    borderBottomWidth: 1,
  },
  segmentedButtons: {
    width: '100%',
  },
  listContainer: {
    padding: 16,
  },
  item: {
    marginBottom: 12,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  artwork: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
  },
});

export default LibraryScreen;
