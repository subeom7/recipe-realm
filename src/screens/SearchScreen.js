import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeSearch from "./search/RecipeSearch";
import RecipeList from "./search/RecipeList";
import RecipeDetails from "./search/RecipeDetails";

const Stack = createStackNavigator();

function SearchScreen() {
  return (
    <Stack.Navigator
      initialRouteName="RecipeSearch"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="RecipeSearch"
        component={RecipeSearch}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="RecipeList"
        component={RecipeList}
        options={{ title: "Recipe List" }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetails}
        options={{ title: "Recipe Details" }}
      />
    </Stack.Navigator>
  );
}

export default SearchScreen;
