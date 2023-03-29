// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeSearch from './src/screens/RecipeSearch';
import RecipeList from './src/screens/RecipeList';
import RecipeDetails from './src/screens/RecipeDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RecipeSearch">
        <Stack.Screen
          name="RecipeSearch"
          component={RecipeSearch}
          options={{ title: 'Recipe Search' }}
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
    </NavigationContainer>
  );
};

export default App;
