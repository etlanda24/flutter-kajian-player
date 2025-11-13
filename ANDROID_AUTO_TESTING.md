# Android Auto Testing Guide

Complete guide for testing your Media Player app with Android Auto.

## Prerequisites

- Android device or emulator (API 23+)
- USB cable (for physical device testing)
- Android Studio installed
- Developer options enabled on device

## Method 1: Test on Physical Phone (Easiest)

### Step 1: Install Android Auto
1. Open Google Play Store
2. Search for "Android Auto"
3. Install the app

### Step 2: Enable Developer Mode
1. Open Android Auto app
2. Tap the hamburger menu (≡) **10 times** quickly
3. You'll see "Developer mode enabled" message
4. Tap the three dots (⋮) in top right corner
5. Select "Developer settings"
6. Enable "Unknown sources"

### Step 3: Test Your App
1. Make sure your Media Player app is installed and running
2. Open Android Auto app
3. Tap "Media" icon at the bottom
4. You should see "MediaPlayer" in the list
5. Tap it to start playing music

### Controls Available:
- Play/Pause
- Skip Next/Previous
- Progress bar
- Queue navigation

## Method 2: Desktop Head Unit (DHU) - Best for Development

DHU simulates an Android Auto car display on your computer.

### Step 1: Install DHU

**Option A: Using Android SDK Manager (Recommended)**
1. Open Android Studio
2. Go to Tools > SDK Manager
3. Click "SDK Tools" tab
4. Check "Android Auto Desktop Head Unit"
5. Click "Apply" to install

**Option B: Manual Download**
1. Download from [Android Developer Downloads](https://developer.android.com/training/cars/testing)
2. Extract to `$ANDROID_HOME/extras/google/auto/`

### Step 2: Setup Your Device
1. Enable Developer Options on your phone:
   - Settings > About Phone
   - Tap "Build Number" 7 times
   
2. Enable USB Debugging:
   - Settings > Developer Options
   - Enable "USB Debugging"
   
3. Connect phone via USB cable

4. Verify ADB connection:
   ```bash
   adb devices
   ```
   You should see your device listed

### Step 3: Start DHU

**On macOS/Linux:**
```bash
cd $ANDROID_HOME/extras/google/auto/desktop-head-unit
./desktop-head-unit
```

**On Windows:**
```cmd
cd %ANDROID_HOME%\extras\google\auto\desktop-head-unit
desktop-head-unit.exe
```

**If installed via SDK Manager:**
```bash
# macOS/Linux
$ANDROID_HOME/extras/google/simulators/desktop-head-unit

# Windows
%ANDROID_HOME%\extras\google\simulators\desktop-head-unit.exe
```

### Step 4: Configure DHU
1. DHU window will open
2. Select your connected device from dropdown
3. Click "Connect"
4. Wait for Android Auto interface to load
5. Your phone screen will show "Android Auto is running"

### Step 5: Test Your App
1. Run your Media Player app on the phone:
   ```bash
   npm run android
   ```
2. In DHU window, click the "Media" icon
3. Select "MediaPlayer" from the list
4. Test all controls: play, pause, skip, seek

### DHU Hotkeys:
- **D**: Toggle day/night mode
- **N**: Next track
- **P**: Play/Pause
- **ESC**: Go back

## Method 3: Android Automotive OS Emulator (Full System)

Test on an actual Automotive OS emulator.

### Step 1: Create Automotive Emulator
1. Open Android Studio
2. Tools > AVD Manager
3. Click "Create Virtual Device"
4. In Category dropdown, select **"Automotive"**
5. Choose device: "Automotive 1024p landscape" (recommended)
6. Click "Next"
7. Select system image:
   - Choose **API 29** (Android 10) or higher
   - Download if needed
8. Click "Next" > "Finish"

### Step 2: Start Automotive Emulator
```bash
# List available emulators
emulator -list-avds

# Start automotive emulator (replace with your emulator name)
emulator -avd Automotive_1024p_landscape_API_29
```

Or start from Android Studio AVD Manager by clicking the ▶️ button.

### Step 3: Install and Run App
```bash
# Install the app
npm run android

# Or manually
npx react-native run-android
```

### Step 4: Open Media App
1. On the automotive emulator, tap the "Media" icon in the bottom bar
2. Your app should appear as "MediaPlayer"
3. Tap it to start using it

### Features in Automotive OS:
- Full integration with system media controls
- Home screen media widget
- Voice commands (if configured)
- Steering wheel controls simulation

## Debugging Tips

### Check if MediaBrowserService is Running
```bash
adb shell dumpsys media_session
```
Look for your app's package name (com.mediaplayer)

### View Logs
```bash
# Filter for Track Player
adb logcat | grep TrackPlayer

# Filter for your app
adb logcat | grep MediaPlayer

# All logs
adb logcat
```

### Common Issues

**App doesn't appear in Android Auto:**
- ✅ Ensure "Unknown sources" is enabled
- ✅ Check app is running on device
- ✅ Restart Android Auto app
- ✅ Verify AndroidManifest.xml has MediaBrowserService

**DHU won't connect:**
- ✅ Only one device should be connected
- ✅ USB debugging must be enabled
- ✅ Try `adb kill-server && adb start-server`
- ✅ Restart DHU

**No audio playing:**
- ✅ Check internet connection (for streaming URLs)
- ✅ Volume is not muted
- ✅ Check logcat for errors

**Controls not working:**
- ✅ Verify playbackService is registered
- ✅ Check TrackPlayer is properly initialized
- ✅ Restart app

## Testing Checklist

Before releasing, test all these scenarios:

### Basic Playback
- [ ] Play a song
- [ ] Pause/Resume
- [ ] Skip to next track
- [ ] Skip to previous track
- [ ] Seek forward/backward

### Android Auto Specific
- [ ] App appears in media list
- [ ] Album art displays correctly
- [ ] Metadata shows (title, artist, album)
- [ ] Controls work from Android Auto UI
- [ ] Queue navigation works
- [ ] App works while screen is off
- [ ] App survives phone calls
- [ ] Works in day/night mode (DHU)

### Edge Cases
- [ ] What happens when internet disconnects?
- [ ] App behavior when audio focus is lost
- [ ] Multiple apps playing audio
- [ ] Low battery scenarios
- [ ] Bluetooth connectivity changes

## Advanced: Testing in a Real Car

If you have access to a car with Android Auto:

1. **Connect phone to car** via USB or wireless
2. **Android Auto will launch** automatically
3. **Tap Media icon** on car display
4. **Select your app** from the list
5. **Test with real steering wheel controls**

### Safety Note:
⚠️ **Never test while driving!** Always have someone else drive or test while parked.

## Next Steps

Once testing is complete:
1. Fix any bugs found
2. Optimize UI for automotive displays
3. Test with real backend data
4. Add analytics to track usage
5. Submit to Google Play Store

## Resources

- [Android Auto Developer Guide](https://developer.android.com/training/cars)
- [DHU Documentation](https://developer.android.com/training/cars/testing)
- [Media App Best Practices](https://developer.android.com/training/cars/media)
- [React Native Track Player Docs](https://react-native-track-player.js.org/)
