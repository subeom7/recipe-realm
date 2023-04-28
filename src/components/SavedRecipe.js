import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet } from "react-native";

const SavedRecipe = ({ id, recipeTitle, recipeImage, navigation }) => {
  const handlePress = () => {
    navigation.navigate("RecipeSavedDetails", { recipeId: id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image style={styles.recipeImage} source={{ uri: recipeImage }} />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.recipeTitle}>{recipeTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    marginLeft: 15,
    shadowOffset: { width: -2, height: 6 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderRadius: 15,
  },
  recipeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  recipeTitle: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    flex: 1,
    flexWrap: "wrap",
  },
});

export default SavedRecipe;
