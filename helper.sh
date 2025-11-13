#!/bin/bash

# Media Player App - Helper Script
# This script helps you quickly run common tasks

echo "🎵 Media Player App - Helper Script"
echo "=================================="
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is not installed"
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Menu
echo "What would you like to do?"
echo "1) Install dependencies"
echo "2) Start Metro bundler"
echo "3) Run on Android"
echo "4) Clean and rebuild"
echo "5) View Android logs"
echo "6) Start Desktop Head Unit (DHU)"
echo "7) List connected devices"
echo "8) Run all (install + start + android)"
echo "9) Exit"
echo ""

read -p "Enter your choice (1-9): " choice

case $choice in
    1)
        echo ""
        echo "📦 Installing dependencies..."
        npm install
        echo "✅ Done!"
        ;;
    2)
        echo ""
        echo "🚀 Starting Metro bundler..."
        npm start
        ;;
    3)
        echo ""
        echo "📱 Running on Android..."
        npm run android
        ;;
    4)
        echo ""
        echo "🧹 Cleaning project..."
        cd android
        ./gradlew clean
        cd ..
        rm -rf node_modules
        npm install
        npm start -- --reset-cache &
        sleep 5
        npm run android
        ;;
    5)
        echo ""
        echo "📋 Showing Android logs (Ctrl+C to exit)..."
        echo ""
        if command_exists adb; then
            adb logcat | grep -E "MediaPlayer|TrackPlayer|ReactNative"
        else
            echo "❌ adb not found. Is Android SDK installed?"
        fi
        ;;
    6)
        echo ""
        echo "🚗 Starting Desktop Head Unit..."
        if [ -z "$ANDROID_HOME" ]; then
            echo "❌ ANDROID_HOME is not set"
            echo "Please set ANDROID_HOME to your Android SDK location"
            exit 1
        fi
        
        DHU_PATH="$ANDROID_HOME/extras/google/auto/desktop-head-unit/desktop-head-unit"
        if [ -f "$DHU_PATH" ]; then
            $DHU_PATH
        else
            echo "❌ DHU not found at $DHU_PATH"
            echo "Install it from Android Studio > SDK Manager > SDK Tools > Android Auto Desktop Head Unit"
        fi
        ;;
    7)
        echo ""
        echo "📱 Connected devices:"
        if command_exists adb; then
            adb devices -l
        else
            echo "❌ adb not found"
        fi
        ;;
    8)
        echo ""
        echo "🚀 Running full setup..."
        echo "Step 1: Installing dependencies..."
        npm install
        echo ""
        echo "Step 2: Starting Metro bundler in background..."
        npm start &
        METRO_PID=$!
        echo "Metro PID: $METRO_PID"
        echo ""
        echo "Waiting for Metro to start..."
        sleep 10
        echo ""
        echo "Step 3: Running on Android..."
        npm run android
        ;;
    9)
        echo "Goodbye! 👋"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac
