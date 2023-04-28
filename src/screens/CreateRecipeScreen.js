import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { TextInput, Button, Picker } from "react-native-paper";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createRecipe } from "../graphql/mutations";
import { useNavigation } from "@react-navigation/native";

const CreateRecipeScreen = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [prepTime, setPrepTime] = useState(30);
  const [instructions, setInstructions] = useState([]);
  const [summary, setSummary] = useState("");
  const [calories, setCalories] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigation = useNavigation();

  const handleCreateRecipe = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const input = {
      name,
      ingredients,
      prepTime: parseInt(prepTime),
      instructions,
      userId: user.attributes.sub,
      userName: user.username,
      image: imageUrl,
      calories,
    };

    try {
      const response = await API.graphql(
        graphqlOperation(createRecipe, { input })
      );
      console.log("New recipe created:", response.data.createRecipe);
      navigation.navigate("Bookmark");
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <ScrollView style={{ padding: 20, marginTop: 70 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 25 }}>
        Create your own recipe
      </Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        label="Ingredients"
        value={ingredients.join(", ")}
        onChangeText={(text) =>
          setIngredients(text.split(",").map((item) => item.trim()))
        }
        style={{ marginBottom: 20 }}
      />
      <TextInput
        label="Ready In Minutes"
        value={prepTime}
        onChangeText={(value) => setPrepTime(value)}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        label="Calories"
        value={calories}
        onChangeText={(value) => setCalories(value)}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        label="Instructions"
        value={instructions.join("\n")}
        onChangeText={(text) =>
          setInstructions(text.split("\n").map((item) => item.trim()))
        }
        style={{ marginBottom: 20 }}
        multiline={true}
        numberOfLines={4}
      />
      <TextInput
        label="Summary"
        value={summary}
        onChangeText={(text) => setSummary(text)}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        label="Image URL"
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)}
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={handleCreateRecipe}>
        Create Recipe
      </Button>
    </ScrollView>
  );
};

export default CreateRecipeScreen;
