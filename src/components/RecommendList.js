import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RecommendList = ({ navigation }) => {
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
            apiKey: "d2570997031b4167b50a62452e288298",
            number: 5,
          },
        }
      );
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error("Error fetching random recipes:", error);
    }
  };

  const RenderItem = ({ item }) => {
    const navigation = useNavigation();

    const handlePress = () => {
      navigation.navigate("RecipeDetails", { recipeId: item.id });
    };

    return (
      <TouchableOpacity onPress={handlePress} style={styles.item}>
        <View style={styles.box}>
          <Image style={styles.recipeImage} source={{ uri: item.image }} />
        </View>
        <Text numberOfLines={1} style={styles.recipeName}>
          {item.title}
        </Text>
        <Text style={styles.recipeTime}>
          Ready in: {item.readyInMinutes} minutes
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SectionList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      sections={[{ title: "Recipes", data: recipes }]}
      renderItem={({ item }) => <RenderItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
    marginBottom: 20,
    marginRight: -30,
    marginLeft: -30,
  },
  contentContainer: {
    paddingLeft: 30,
    paddingRight: 20,
  },
  item: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 10,
  },
  box: {
    // backgroundColor: '#FFFFFF',
    backgroundColor: "pink",
    borderRadius: 10,
    marginTop: 10,
    width: 150, // set a fixed width for the box
    height: 200, // set a fixed height for the box
    alignItems: "center",
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 10,
    width: 140,
  },
  recipeTime: {
    fontSize: 12,
    alignItems: "center",
    color: "#808080",
  },
  recipeImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
});

export default RecommendList;
