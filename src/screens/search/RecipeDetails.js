import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const RecipeDetails = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  async function fetchRecipeDetails() {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=d09d6982101f4d10968b4c601cd128f5`
      );
      if (response.ok) {
        const data = await response.json();
        setRecipeDetails(data);
      } else {
        console.error('Error fetching recipe details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  }

  if (!recipeDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <View>
        <Text>{recipeDetails.title}</Text>
        <Image
          style={{ width: '100%', height: 200 }}
          source={{ uri: recipeDetails.image }}
        />
        {/* <Text>Cuisine: {recipeDetails.cuisine}</Text>
        <Text>Diet: {recipeDetails.diets.join(', ')}</Text> */}
        <Text>
          Ingredients:{' '}
          {recipeDetails.extendedIngredients
            .map((ingredient) => ingredient.name)
            .join(', ')}
        </Text>
        <Text>Ready in: {recipeDetails.readyInMinutes} minutes</Text>
        <Text>Instructions:</Text>
        {recipeDetails.analyzedInstructions[0]?.steps.map((step) => (
          <Text key={step.number}>
            {step.number}. {step.step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default RecipeDetails;
