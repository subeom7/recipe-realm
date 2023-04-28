// src/screens/RecipeSearch.js
import React, { useState } from "react";
import { View, FlatList } from "react-native";
import axios from "axios";
import SearchBar from "../../components/SearchBar";
import ClickableRecipe from "../../components/ClickableRecipe";
import { API_KEY } from "@env";
import SearchComponent from "../../components/SearchComponent";

const RecipeSearch = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const searchRecipes = async () => {
    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        {
          params: {
            // apiKey: process.env.API_KEY,
            apiKey: "0e18077b33ab44fc9bfb2d46ea51cd45",
            query: search,
            number: 20,
          },
        }
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error searching for recipes:", error);
    }
  };

  return (
    <View style={{ marginTop: 80 }}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        searchRecipes={searchRecipes}
      />
      {/* <SearchComponent search={search} setSearch={setSearch} searchRecipes={searchRecipes} /> */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ClickableRecipe recipe={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default RecipeSearch;
