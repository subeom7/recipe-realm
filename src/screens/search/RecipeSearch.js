// src/screens/RecipeSearch.js
import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import ClickableRecipe from '../../components/ClickableRecipe';
import { API_KEY } from '@env';

const RecipeSearch = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  const searchRecipes = async () => {
    try {
      const response = await axios.get(
        'https://api.spoonacular.com/recipes/complexSearch',
        {
          params: {
            apiKey: API_KEY,
            query: search,
            number: 10,
          },
        }
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error('Error searching for recipes:', error);
    }
  };

  return (
    <View>
      <SearchBar search={search} setSearch={setSearch} searchRecipes={searchRecipes} />
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
