import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Surface, IconButton, useTheme} from 'react-native-paper';
import {usePlayer} from '../contexts/PlayerContext';

const MiniPlayer: React.FC<{onPress: () => void}> = ({onPress}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const {currentSong, isPlaying, pause, resume} = usePlayer();

  if (!currentSong) {
    return null;
  }

  return (
    <Surface 
      style={[styles.container, {paddingBottom: insets.bottom}]}
      elevation={3}>
      <Surface 
        style={styles.touchableArea}
        onTouchEnd={onPress}>
        <Image source={{uri: currentSong.artwork}} style={styles.artwork} />
        <View style={styles.info}>
          <Text style={[styles.title, {color: theme.colors.onSurface}]} numberOfLines={1}>
            {currentSong.title}
          </Text>
          <Text style={[styles.artist, {color: theme.colors.onSurfaceVariant}]} numberOfLines={1}>
            {currentSong.artist}
          </Text>
        </View>
      </Surface>
      <IconButton
        icon={isPlaying ? 'pause' : 'play'}
        iconColor={theme.colors.onPrimary}
        containerColor={theme.colors.primary}
        size={24}
        onPress={isPlaying ? pause : resume}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  touchableArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  artist: {
    fontSize: 13,
  },
});

export default MiniPlayer;
