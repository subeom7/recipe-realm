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
import { getRecipe } from "../../graphql/queries";

const { height } = Dimensions.get("window");

const RecipeSavedDetails = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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

  const translateY = scrollY.interpolate({
    inputRange: [0, height * 0.8],
    outputRange: [0, -height * 0.35],
    extrapolate: "clamp",
  });

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await API.graphql({
          query: getRecipe,
          variables: {
            id: recipeId,
          },
        });
        const recipeData = response.data.getRecipe;
        setRecipe(recipeData);
        console.log(recipeData.instructions);
      } catch (error) {
        console.log("Error retrieving recipe: ", error);
      }
    }
    fetchRecipe();
  }, []);

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Image
        style={{ width: "100%", height: 500 }}
        source={{
          uri: recipe.image,
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

        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.author}>by {recipe.author || "Unknown"}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="time" size={24} color="#888" />
            <Text style={styles.infoText}>{recipe.prepTime} min</Text>
          </View>
          {/* <View style={styles.infoItem}>
            <FontAwesome name="cutlery" size={24} color="#888" />
            <Text style={styles.infoText}>
              {recipe.cuisines.join(", ")}
            </Text>
          </View> */}
          <View style={styles.infoItem}>
            <Ionicons name="flame" size={24} color="#888" />
            {/* {calories.unit} ({calories.percentOfDailyNeeds.toFixed(2)}% of daily needs) */}
            <Text style={styles.infoText}>
              {parseFloat(recipe.calories.match(/amount=([\d.]+)/)[1]).toFixed(
                2
              )}{" "}
              kcal
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
          source={{ html: recipe.summary }}
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
        {recipe.ingredients && (
          <>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((ingredient, index) => (
              // console.log(ingredient.match(/name=([^,]+)/)[1])
              <View
                key={`${ingredient.match(/name=([^,]+)/)[1]}-${index}`}
                style={styles.ingredientContainer}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={styles.ingredientImage}
                    source={{
                      uri: `https://spoonacular.com/cdn/ingredients_100x100/${
                        ingredient.match(/image=([^,]+)/)[1]
                      }`,
                    }}
                  />
                  <Text style={styles.ingredientName}>
                    {ingredient.match(/name=([^,]+)/)[1]}
                  </Text>
                </View>
                <Text style={styles.ingredientAmount}>
                  {ingredient.match(/us={value=([^,}]+)/)[1]}{" "}
                  {ingredient.match(/us={value=([^,]+), unit=([^,}]+)/)[2]}
                </Text>
              </View>
            ))}
          </>
        )}

        <Text style={styles.sectionTitle}>Instruction</Text>
        {recipe.instructions.map((step, index) => (
          <Text key={index + 1}>
            {index + 1}. {step}
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

export default RecipeSavedDetails;
