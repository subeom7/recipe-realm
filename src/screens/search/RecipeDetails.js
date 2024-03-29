import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { createRecipe } from "../../graphql/mutations";

const { height } = Dimensions.get("window");

const RecipeDetails = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [calories, setCalories] = useState(null);
  const [summary, setSummary] = useState(null);
  const [ingredients, setIngredients] = useState(null);

  const [instructionsForDB, setInstructionsForDB] = useState([]);
  const [ingredientsForDB, setIngredientsForDB] = useState([]);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  useEffect(() => {
    fetchCalories();
  }, []);

  useEffect(() => {
    fetchSummary();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      headerLeft: () => (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Bookmark
  useEffect(() => {
    if (recipeDetails) {
      recipeDetails.analyzedInstructions[0]?.steps.map((step) =>
        setInstructionsForDB((prev) => [...prev, step.step])
      );
      recipeDetails.extendedIngredients.map((ingredient) =>
        setIngredientsForDB((prev) => [...prev, ingredient.name])
      );
    }
  }, [recipeDetails]);

  const translateY = scrollY.interpolate({
    inputRange: [0, height * 0.8],
    outputRange: [0, -height * 0.35],
    extrapolate: "clamp",
  });

  async function fetchRecipeDetails() {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=0e18077b33ab44fc9bfb2d46ea51cd45&addRecipeInformation=true`
      );
      if (response.ok) {
        const data = await response.json();
        setRecipeDetails(data);
      } else {
        console.error("Error fetching recipe details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  }

  async function fetchCalories() {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=0e18077b33ab44fc9bfb2d46ea51cd45`
      );
      if (response.ok) {
        const data = await response.json();
        setCalories(
          data.nutrients.find((nutrient) => nutrient.name === "Calories")
        );
      } else {
        console.error("Error fetching calories:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching calories:", error);
    }
  }

  async function fetchSummary() {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/summary?apiKey=0e18077b33ab44fc9bfb2d46ea51cd45`
      );
      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
      } else {
        console.error("Error fetching summary:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }

  async function fetchIngredients() {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=0e18077b33ab44fc9bfb2d46ea51cd45`
      );
      if (response.ok) {
        const data = await response.json();
        setIngredients(data.ingredients);
      } else {
        console.error("Error fetching ingredients:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  }

  if (!recipeDetails || !calories || !summary) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  const handleSave = async () => {
    try {
      const recipe = await recipeDetails;
      const caloriesForDB = await calories;
      const summaryForDB = await summary;
      const ingredientsForDB = await ingredients;
      const photo = recipe.image;
      const user = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(createRecipe, {
          input: {
            name: recipe.title,
            ingredients: ingredientsForDB,
            prepTime: recipe.readyInMinutes,
            instructions: instructionsForDB,
            userId: user.attributes.sub,
            userName: user.username,
            image: photo,
            summary: summaryForDB,
            calories: caloriesForDB,
          },
        })
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.bookmarkButton} onPress={handleSave}>
        <MaterialIcons name="bookmark" color={"#808080"} size={24} />
      </TouchableOpacity>
      <Image
        style={{ width: "100%", height: 500 }}
        source={{
          uri: `https://spoonacular.com/recipeImages/${recipeId}-636x393.${recipeDetails.imageType}`,
        }}
        contentInset={{ top: 100 }}
      />

      <Animated.ScrollView
        contentContainerStyle={styles.textContainer}
        style={[styles.textWrapper, { transform: [{ translateY }] }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.draggableIndicator} />

        <Text style={styles.title}>{recipeDetails.title}</Text>
        <Text style={styles.author}>
          by {recipeDetails.author || "Unknown"}
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="time" size={24} color="#888" />
            <Text style={styles.infoText}>
              {recipeDetails.readyInMinutes} min
            </Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="cutlery" size={24} color="#888" />
            <Text style={styles.infoText}>
              {recipeDetails.cuisines.join(", ")}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="flame" size={24} color="#888" />
            {/* {calories.unit} ({calories.percentOfDailyNeeds.toFixed(2)}% of daily needs) */}
            <Text style={styles.infoText}>
              {calories.amount.toFixed(2)} kcal
            </Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={24} color="#FFD700" />
          <Text style={styles.ratingText}>4.5</Text>
        </View>
        <Text style={styles.description}>Description</Text>
        <RenderHTML
          contentWidth={100}
          source={{ html: summary }}
          style={styles.summary}
          tagsStyles={{
            a: {
              color: "black",
              textDecorationLine: "underline",
            },
            body: {
              fontFamily: "italic",
            },
          }}
        />

        <Text></Text>
        {/* <Text>
          Ingredients:{' '}
          {recipeDetails.extendedIngredients
            .map((ingredient) => ingredient.name)
            .join(', ')}
        </Text> */}

        {ingredients && (
          <>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {ingredients.map((ingredient, index) => (
              <View
                key={`${ingredient.name}-${index}`}
                style={styles.ingredientContainer}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={styles.ingredientImage}
                    source={{
                      uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
                    }}
                  />
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                </View>
                <Text style={styles.ingredientAmount}>
                  {ingredient.amount.us.value} {ingredient.amount.us.unit}
                </Text>
              </View>
            ))}
          </>
        )}

        <Text style={styles.sectionTitle}>Instruction</Text>
        {recipeDetails.analyzedInstructions[0]?.steps.map((step) => (
          <Text key={step.number}>
            {step.number}. {step.step}
          </Text>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  draggableIndicator: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
    marginBottom: 8,
  },
  backButton: {
    marginLeft: 10,
    top: -20,
    backgroundColor: "#FFF",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkButton: {
    position: "absolute",
    top: 50,
    right: 10,
    zIndex: 1,
    backgroundColor: "#FFF",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingContainer: {
    position: "absolute",
    top: 15,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 18,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: height / 2,
  },
  textWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: height / 2,
    height: height,
    maxHeight: height - 100,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  textContainer: {
    paddingBottom: height / 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    flexWrap: "wrap",
    width: "75%",
  },
  author: {
    fontSize: 14,
    color: "lightgray",
    marginBottom: 14,
    bottom: 10,
  },
  cuisine: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    flexBasis: "33%",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#888",
    marginLeft: 4,
  },
  description: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    color: "lightgray",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  ingredientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  ingredientAmount: {
    fontSize: 16,
    // color: 'lightgrey',
  },
  ingredientImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  ingredientName: {
    fontSize: 16,
    flexWrap: "wrap",
    width: "50%",
  },
});

export default RecipeDetails;
