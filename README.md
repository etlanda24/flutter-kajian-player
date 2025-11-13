# Media Player App

A Spotify-like music player app built with React Native, featuring **Android Auto support** and background playback capabilities.

## Features

- 🎵 Play audio/music with background playback support
- 📱 Beautiful Spotify-inspired UI with dark theme
- 🎨 Home screen with recently played and recommended songs
- 📚 Library with playlists and albums
- 🎛️ Full-featured player screen with seek controls
- 🚗 **Android Auto support** for in-car playback
- 🔄 Queue management and skip controls
- 📲 Mini player for quick access

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **React Native Track Player** - Audio playback and Android Auto integration
- **React Navigation** - Screen navigation
- **TypeScript** - Type-safe development

## Prerequisites

Before running the app, ensure you have:

- Node.js (v18 or higher)
- npm or yarn
- Android Studio with Android SDK
- JDK 17 or higher
- For Android Auto testing:
  - Android device/emulator running Android 6.0 (API 23) or higher
  - Android Auto app (for phone testing)
  - Desktop Head Unit (DHU) for desktop testing

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install iOS dependencies (optional, for iOS development):**
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### On Android Emulator/Device

```sh
### On Android Emulator/Device

1. **Start Metro bundler:**
   ```bash
   npm start
   ```

2. **In another terminal, run the Android app:**
   ```bash
   npm run android
   ```

### On Physical Android Device

1. **Enable Developer Options:**
   - Go to Settings > About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings > Developer Options
   - Enable "USB Debugging"

2. **Connect your device via USB**

3. **Run the app:**
   ```bash
   npm run android
   ```

## Testing Android Auto

### Option 1: Testing on Phone with Android Auto App

1. **Install Android Auto app** from Google Play Store

2. **Enable Developer Mode in Android Auto:**
   - Open Android Auto app
   - Tap the hamburger menu (≡) 10 times
   - Tap the three dots (⋮) in the top right
   - Select "Developer Settings"
   - Enable "Unknown sources"

3. **Run your Media Player app** on the phone

4. **Open Android Auto app** - Your app should appear in the media section

### Option 2: Testing with Desktop Head Unit (DHU)

1. **Download DHU from Android SDK Manager**

2. **Enable Developer Mode** on your Android device

3. **Connect phone via USB** with USB debugging enabled

4. **Start DHU:**
   ```bash
   cd $ANDROID_HOME/extras/google/auto/desktop-head-unit
   ./desktop-head-unit
   ```

5. **Select your device** and click "Connect"

6. **Test your app** in the DHU interface

### Option 3: Android Automotive OS Emulator

1. **Create Automotive Emulator in Android Studio:**
   - Tools > AVD Manager > Create Virtual Device
   - Select "Automotive" category
   - Choose a device and system image (API 29+)

2. **Start emulator:**
   ```bash
   emulator -avd <automotive_emulator_name>
   ```

3. **Run your app:**
   ```bash
   npm run android
   ```

## Project Structure

```
MediaPlayer/
├── src/
│   ├── components/
│   │   └── MiniPlayer.tsx          # Mini player component
│   ├── contexts/
│   │   └── PlayerContext.tsx       # Player state management
│   ├── data/
│   │   └── dummyData.ts           # Dummy songs & playlists
│   ├── navigation/
│   │   └── AppNavigator.tsx       # Navigation setup
│   ├── screens/
│   │   ├── HomeScreen.tsx         # Home screen
│   │   ├── LibraryScreen.tsx      # Library screen
│   │   └── PlayerScreen.tsx       # Player screen
│   └── services/
│       └── playbackService.ts     # Track Player service
├── android/                        # Android native code
├── App.tsx                        # Main app component
└── package.json
```

## Key Features

### Android Auto Integration

- Uses `react-native-track-player` with MediaBrowserService
- Configured in `AndroidManifest.xml`
- Works in background and with Android Auto

### Background Playback

Audio continues playing when:
- App is in background
- Screen is locked
- Using Android Auto

## Customization

### Connect to Real Backend

Replace dummy data in `src/data/dummyData.ts` with API calls:

```typescript
// Example
export const fetchSongs = async () => {
  const response = await fetch('https://your-api.com/songs');
  return response.json();
};
```

### Change Theme Colors

Main colors in styles:
- Background: `#121212`
- Accent: `#1DB954`
- Text: `#FFFFFF`, `#B3B3B3`

## Troubleshooting

**App crashes on startup:**
- Run `npm install`
- Clean build: `cd android && ./gradlew clean`
- Reset cache: `npm start -- --reset-cache`

**Android Auto not showing app:**
- Enable "Unknown sources" in Android Auto
- Verify AndroidManifest.xml configuration
- Restart Android Auto app

**Audio not playing:**
- Check internet connection
- Check permissions
- View logs: `adb logcat | grep TrackPlayer`

## Resources

- [React Native Track Player](https://react-native-track-player.js.org/)
- [Android Auto Documentation](https://developer.android.com/training/cars)
- [Desktop Head Unit Testing](https://developer.android.com/training/cars/testing)

## Original React Native Documentation

For the original React Native setup guide, see [README_ORIGINAL.md](./README_ORIGINAL.md).
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
