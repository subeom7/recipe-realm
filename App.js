import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { createStackNavigator } from '@react-navigation/stack';
import RecipeSearch from './src/screens/RecipeSearch';
import RecipeList from './src/screens/RecipeList';
import RecipeDetails from './src/screens/RecipeDetails';

export default function App() {
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
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="search" color={color} size={size} />
            ),
          }}/>
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
          }}/>
        <Tab.Screen 
          name="More" 
          component={MoreScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="more-horiz" color={color} size={size} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Component
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

// Search Component
function SearchScreen() {
  return (
      <Stack.Navigator initialRouteName="RecipeSearch">
        <Stack.Screen
          name="RecipeSearch"
          component={RecipeSearch}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="RecipeList"
          component={RecipeList}
          options={{ title: 'Recipe List' }}
        />
        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetails}
          options={{ title: 'Recipe Details' }}
        />
      </Stack.Navigator>
  );
}

// Bookmark Component
function BookmarkScreen() {
  return (
    <View style={styles.container}>
      <Text>Bookmark Screen</Text>
    </View>
  );
}

// AI Component
function AIScreen() {
  return (
    <View style={styles.container}>
      <Text>AI Screen</Text>
    </View>
  );
}

// More Component
function MoreScreen() {
  return (
    <View style={styles.container}>
      <Text>More Screen</Text>
    </View>
  );
}


// // App.js
// import React from 'react';

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="RecipeSearch">
//         <Stack.Screen
//           name="RecipeSearch"
//           component={RecipeSearch}
//           options={{ title: 'Recipe Search' }}
//         />
//         <Stack.Screen
//           name="RecipeList"
//           component={RecipeList}
//           options={{ title: 'Recipe List' }}
//         />
//         <Stack.Screen
//           name="RecipeDetails"
//           component={RecipeDetails}
//           options={{ title: 'Recipe Details' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
