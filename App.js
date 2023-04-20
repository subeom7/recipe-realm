import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/Octicons';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
import AIScreen from './src/screens/AIScreen';
import MoreScreen from './src/screens/MoreScreen';

import RecipeDetails from './src/screens/search/RecipeDetails';

export default function App() {

  const Tab = createBottomTabNavigator();
  const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow
      }}
      onPress={onPress}
    >
      <View style={{
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: '#1a995c'
      }}>
        {children}
      </View>
    </TouchableOpacity>
  );
  const HomeStack = createStackNavigator();

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <HomeStack.Screen name="HomeTab" component={HomeScreen} />
        <HomeStack.Screen name="RecipeDetails" component={RecipeDetails} />
      </HomeStack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: '#1a995c',
          tabBarStyle: {
            height: 80,
          },
          tabBarIconStyle: {
            position: 'relative',
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
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
          name="AI"
          component={AIScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="plus" color={'white'} size={30}/>
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} />
            )
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={BookmarkScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="bookmark" color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})