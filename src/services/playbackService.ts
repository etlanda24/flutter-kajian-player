// Simple playback service using react-native-sound
export async function setupPlayer() {
  try {
    console.log('Player setup complete (using react-native-sound)');
    return true;
  } catch (error) {
    console.error('Error setting up player:', error);
    return false;
  }
}

export async function addTracks() {
  // Tracks will be managed by the app context
}

export async function playbackService() {
  // Service not needed for simple sound playback
}
