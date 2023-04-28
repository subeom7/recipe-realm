import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from "react-native";

import { listRecipes } from "../../graphql/queries";
import RecipeSavedList from "./RecipeSavedList";

const RecipeSavedSearch = ({navigation}) => {
  const [recipeList, setRecipeList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecipes = async () => {
    try {
      const recipes = await API.graphql({ query: listRecipes });
      if (recipes.data.listRecipes) {
        setRecipeList(recipes.data.listRecipes.items);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecipes();
    setRefreshing(false);
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <Text style={styles.title}>Bookmark</Text> */}
      <SafeAreaView>
        <RecipeSavedList
          savedRecipeList={recipeList}
          refreshing={refreshing}
          onRefresh={onRefresh}
          navigation={navigation}
        />
      </SafeAreaView>
    </>
  );
};

export default RecipeSavedSearch;
