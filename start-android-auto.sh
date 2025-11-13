#!/bin/bash

# Android Auto Desktop Head Unit Test Script
# This script helps you test your app with Android Auto emulator

echo "🚗 Android Auto Desktop Head Unit Launcher"
echo "=========================================="
echo ""

# Check if device is connected
DEVICE=$(adb devices | grep -v "List" | grep "device" | awk '{print $1}')

if [ -z "$DEVICE" ]; then
    echo "❌ No device connected!"
    echo "Please connect your phone via USB or start an emulator"
    exit 1
fi

echo "✅ Device connected: $DEVICE"
echo ""

# Enable developer mode on the device
echo "📱 Configuring device for Android Auto..."
adb shell am start -n com.google.android.projection.gearhead/.settings.GearheadDevelopmentSettingsActivity 2>/dev/null

echo ""
echo "⚠️  IMPORTANT: On your phone/emulator:"
echo "   1. Install 'Android Auto' app from Play Store if not installed"
echo "   2. Open Android Auto app"
echo "   3. Go to Settings (⋮) → About"
echo "   4. Tap 'Version' 10 times to enable Developer Mode"
echo "   5. Go back → Developer Settings"
echo "   6. Enable 'Unknown sources'"
echo ""

read -p "Press ENTER when you've completed the above steps..."

echo ""
echo "🚀 Starting Android Auto Desktop Head Unit..."
echo ""
echo "Controls:"
echo "  - Click on your app in the DHU to test it"
echo "  - Use mouse to interact"
echo "  - Press Ctrl+C in this terminal to stop DHU"
echo ""

# Start DHU
cd ~/Library/Android/sdk/extras/google/auto/
./desktop-head-unit
