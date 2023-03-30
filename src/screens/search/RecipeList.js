// src/screens/RecipeList.js
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import axios from 'axios';
import ClickableRecipe from '../../components/ClickableRecipe';

const RecipeList = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    try {
      const response = await axios.get(
        'https://api.spoonacular.com/recipes/random',
        {
          params: {
            apiKey: 'd09d6982101f4d10968b4c601cd128f5',
            number: 10,
          },
        }
      );
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
    }
  };

  return (
    <View>
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

export default RecipeList;
