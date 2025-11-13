# App Screens Overview

## 🏠 Home Screen
**What it shows:**
- Recently Played section (4 songs)
- Your Playlists (horizontal scroll)
- Recommended section (4 songs)

**What you can do:**
- Tap any song to play it
- Tap a playlist to play all songs in it
- Scroll through recommendations

**Navigation:**
- Bottom tab: "Home" icon 🏠
- Mini player at bottom (when playing)

---

## 📚 Library Screen
**What it shows:**
- Two tabs: Playlists | Albums
- Playlists tab: Shows all 4 playlists with artwork
- Albums tab: Shows all 4 albums with artist and year

**What you can do:**
- Switch between Playlists and Albums tabs
- Tap any playlist/album to play it
- See song count for each playlist

**Navigation:**
- Bottom tab: "Library" icon 📚
- Mini player at bottom (when playing)

---

## 🎵 Full Player Screen
**What it shows:**
- Large album artwork
- Song title and artist
- Progress bar with current time and duration
- Playback controls (previous, play/pause, next)

**What you can do:**
- Play/pause the current song
- Skip to next or previous track
- Seek through the song using slider
- Pull down to return to previous screen

**Navigation:**
- Tap mini player to open
- Modal presentation (swipe down or back to close)

---

## 📲 Mini Player
**What it shows:**
- Small album artwork (44x44)
- Song title and artist (truncated if long)
- Play/pause button

**What you can do:**
- Quick play/pause without opening full player
- Tap anywhere (except play button) to open full player
- Visible on Home and Library screens when music is playing

**Behavior:**
- Automatically appears when you start playing
- Stays at bottom of screen
- Persists when navigating between tabs

---

## 🚗 Android Auto Interface
**What it shows (on car display):**
- App icon and name "MediaPlayer"
- Currently playing song info
- Album artwork
- Playback controls optimized for driving

**What you can do:**
- Browse your music library
- Play/pause with large buttons
- Skip tracks using steering wheel or touch
- View now playing info

**Safety features:**
- Large touch targets
- Simplified UI
- Voice control ready (if implemented)
- Minimal distraction design

---

## Screen Flow Diagram

```
┌─────────────────────────────────────────────┐
│                                             │
│  Tab Navigation (Bottom)                    │
│  ┌─────────────┬─────────────┐             │
│  │   Home 🏠   │  Library 📚 │             │
│  └─────────────┴─────────────┘             │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │        Screen Content               │   │
│  │                                     │   │
│  │  - Recently Played                  │   │
│  │  - Playlists                        │   │
│  │  - Recommended                      │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Mini Player (tap to expand)        │   │
│  │  [🎵] Song • Artist          [▶]    │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
                     │
                     │ (tap mini player)
                     ▼
┌─────────────────────────────────────────────┐
│          Full Player (Modal)                │
│                                             │
│         ┌───────────────────┐               │
│         │                   │               │
│         │   Album Artwork   │               │
│         │    (Large)        │               │
│         │                   │               │
│         └───────────────────┘               │
│                                             │
│              Song Title                     │
│              Artist Name                    │
│                                             │
│    ════════●══════════ 2:45 / 4:05          │
│                                             │
│         ⏮    ▶/⏸    ⏭                      │
│                                             │
└─────────────────────────────────────────────┘
                     │
                     │ (swipe down)
                     ▼
              Back to tabs
```

---

## Color Scheme Visual

```
┌────────────────────────────────────────┐
│ #121212 - Background (Very Dark)       │
│ ┌────────────────────────────────────┐ │
│ │ #1E1E1E - Card Background (Dark)   │ │
│ │                                    │ │
│ │ #FFFFFF - Primary Text (White)     │ │
│ │ #B3B3B3 - Secondary Text (Gray)    │ │
│ │                                    │ │
│ │ ┌────────────────────────────────┐ │ │
│ │ │ #1DB954 - Accent (Spotify Green)│ │ │
│ │ └────────────────────────────────┘ │ │
│ └────────────────────────────────────┘ │
│ ─────────────────────────────────────  │
│ #282828 - Border/Separator             │
└────────────────────────────────────────┘
```

---

## Interaction Examples

### Example 1: Playing a Song from Home
1. User opens app → sees Home screen
2. User taps on "Summer Vibes" song
3. Song starts playing
4. Mini player appears at bottom
5. User can continue browsing while music plays

### Example 2: Playing a Playlist
1. User switches to Library tab
2. User taps "Chill Vibes" playlist
3. First song in playlist starts
4. Queue is populated with all playlist songs
5. User can skip through playlist songs

### Example 3: Using Android Auto
1. User connects phone to car
2. User opens Android Auto
3. User taps Media → MediaPlayer
4. User sees their library
5. User taps a song using car display
6. Music plays through car speakers
7. User controls playback from steering wheel

---

## UI Components Used

### Standard React Native
- `View` - Layout containers
- `Text` - Text display
- `Image` - Album artwork
- `TouchableOpacity` - Buttons
- `FlatList` - Scrollable lists
- `ScrollView` - Scrollable content
- `StyleSheet` - Styling

### Navigation
- `Bottom Tab Navigator` - Main tabs
- `Stack Navigator` - Modal screens

### Third Party
- `Slider` - Seek bar
- `TrackPlayer` - Audio playback (background)

---

## Responsive Behavior

### Different Screen Sizes
- Album artwork scales based on screen width
- Lists adapt to available space
- Mini player always 60px height
- Tab bar always 60px height

### Orientation
- App works in portrait (primary)
- Landscape supported but optimized for portrait
- Android Auto uses landscape (handled automatically)

### Text Overflow
- Song titles truncated with ellipsis (...)
- Artist names truncated if too long
- Playlist descriptions show max 2 lines

---

## Accessibility Features

### Built-in Support
- Touch targets are large (minimum 44x44)
- High contrast colors
- Clear text labels
- Proper semantic structure

### Future Enhancements
- Screen reader support
- Voice control
- Larger text options
- Color blind friendly mode

---

This visual guide helps you understand the app structure without running it!
