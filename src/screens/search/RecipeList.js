// src/screens/RecipeList.js
import React, { useEffect, useState } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import ClickableRecipe from "../../components/ClickableRecipe";

const RecipeList = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/random",
        {
          params: {
            apiKey: "0e18077b33ab44fc9bfb2d46ea51cd45",
            number: 10,
          },
        }
      );
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error("Error fetching random recipes:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#1a995c", "#FFA07A", "#EE82EE"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ClickableRecipe recipe={item} navigation={navigation} />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RecipeList;
