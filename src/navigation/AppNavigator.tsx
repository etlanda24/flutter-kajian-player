import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PlayerScreen from '../screens/PlayerScreen';
import MiniPlayer from '../components/MiniPlayer';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabIcon = ({color}: {color: string}) => (
  <Icon name="home-variant" size={24} color={color} />
);

const LibraryTabIcon = ({color}: {color: string}) => (
  <Icon name="library-music" size={24} color={color} />
);

const TabNavigator = ({
  navigation,
}: {
  navigation: any;
}) => {
  const insets = useSafeAreaInsets();
  
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#1E1E1E',
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: -2},
            shadowOpacity: 0.1,
            shadowRadius: 8,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#1DB954',
          tabBarInactiveTintColor: '#B3B3B3',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginBottom: 4,
          },
          headerStyle: {
            backgroundColor: '#121212',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: HomeTabIcon,
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            tabBarIcon: LibraryTabIcon,
          }}
        />
      </Tab.Navigator>
      <MiniPlayer onPress={() => navigation.navigate('Player')} />
    </>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Player"
        component={PlayerScreen}
        options={{
          title: 'Now Playing',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
