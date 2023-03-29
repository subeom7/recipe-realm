// src/components/ClickableRecipe.js
import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';

const ClickableRecipe = ({ recipe, navigation }) => {
  const handlePress = () => {
    navigation.navigate('RecipeDetails', { recipeId: recipe.id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image
        style={styles.recipeImage}
        source={{ uri: recipe.image }}
      />
      <Text style={styles.recipeTitle}>{recipe.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  recipeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  recipeTitle: {
    fontSize: 16,
  },
});

export default ClickableRecipe;
