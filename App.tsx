/**
 * Media Player App
 * A Spotify-like music player with Android Auto support
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {MD3DarkTheme, PaperProvider} from 'react-native-paper';
import {PlayerProvider} from './src/contexts/PlayerContext';
import AppNavigator from './src/navigation/AppNavigator';

// Material 3 Dark Theme
const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#1DB954', // Spotify green
    secondary: '#1ED760',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#282828',
    onSurface: '#FFFFFF',
    onSurfaceVariant: '#B3B3B3',
  },
};

// Navigation theme to match Material 3
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#282828',
    primary: '#1DB954',
  },
};

function App() {
  useEffect(() => {
    // Enable edge-to-edge on Android to handle navigation bar properly
    // This is handled by react-native-safe-area-context
  }, []);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          <PlayerProvider>
            <StatusBar 
              barStyle="light-content" 
              backgroundColor="transparent"
              translucent={true}
            />
            <AppNavigator />
          </PlayerProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
