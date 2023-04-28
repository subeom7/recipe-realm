import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeSavedSearch from "./databaseSearch/RecipeSavedSearch";
import RecipeSavedList from "./databaseSearch/RecipeSavedList";
import RecipeSavedDetails from "./databaseSearch/RecipeSavedDetails";
import { Analytics } from "aws-amplify";

const Stack = createStackNavigator();

const BookmarkScreen = () => {
  // AWS analytics
  useEffect(() => {
    Analytics.record("Bookmark Page Visit");
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="RecipeSavedSearch"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="RecipeSavedSearch"
        component={RecipeSavedSearch}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="RecipeSavedList"
        component={RecipeSavedList}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="RecipeSavedDetails"
        component={RecipeSavedDetails}
        options={{ title: "Saved Recipe Details" }}
      />
    </Stack.Navigator>
  );
};

export default BookmarkScreen;
