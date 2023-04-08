import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
// import { API_KEY } from '@env';

const RecipeDetails = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  async function fetchRecipeDetails() {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.API_KEY}`
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

  async function shareRecipe() {
    try {
      const pdfName = `${recipeDetails.title.replace(/\s+/g, '_')}.pdf`;
      const pdfUri = await Print.printToFileAsync({
        html: `
          <h1>${recipeDetails.title}</h1>
          <img src="${recipeDetails.image}" width="100%" />
          <h2>Ingredients</h2>
          <ul>
            ${recipeDetails.extendedIngredients
              .map((ingredient) => `<li>${ingredient.name}</li>`)
              .join('')}
          </ul>
          <h2>Instructions</h2>
          <ol>
            ${recipeDetails.analyzedInstructions[0]?.steps
              .map((step) => `<li>${step.step}</li>`)
              .join('')}
          </ol>
        `,
      });

      if (!(await Sharing.isAvailableAsync())) {
        alert('Sharing is not available on this device');
        return;
      }

      await Sharing.shareAsync(pdfUri.uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Recipe PDF',
        UTI: 'com.adobe.pdf',
      });
    } catch (error) {
      console.error('Error sharing recipe:', error);
      alert('Error sharing recipe');
    }
  }
  

  if (!recipeDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <TouchableOpacity onPress={shareRecipe}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
          Share Recipe
        </Text>
      </TouchableOpacity>
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
