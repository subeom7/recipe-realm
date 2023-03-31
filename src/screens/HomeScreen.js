import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import RecipeOfTheDay from '../components/RecipeOfTheDay';
import { API_KEY } from '@env';

const HomeScreen = ({ navigation }) => {
  const [recipeOfTheDay, setRecipeOfTheDay] = useState(null);

  useEffect(() => {
    fetchRecipeOfTheDay();
  }, []);

  const fetchRecipeOfTheDay = async () => {
    try {
      const response = await axios.get(
        'https://api.spoonacular.com/recipes/random',
        {
          params: {
            apiKey: API_KEY,
            number: 1,
          },
        }
      );
      setRecipeOfTheDay(response.data.recipes[0]);
    } catch (error) {
      console.error('Error fetching recipe of the day:', error);
    }
  };

  if (!recipeOfTheDay) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe of the Day</Text>
      <RecipeOfTheDay recipe={recipeOfTheDay} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;
