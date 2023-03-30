import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
import AIScreen from './src/screens/AIScreen';
import MoreScreen from './src/screens/MoreScreen';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Bookmark" 
          component={BookmarkScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="bookmark" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="AI" 
          component={AIScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="chat" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="More" 
          component={MoreScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="more-horiz" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
