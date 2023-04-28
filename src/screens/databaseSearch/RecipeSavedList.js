import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
  TextInput,
} from "react-native";
import axios from "axios";
import ClickableRecipe from "../../components/ClickableRecipe";
import SavedRecipe from "../../components/SavedRecipe";
import SearchBar from "../../components/SearchBar";
import { Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

const RecipeSavedList = ({
  savedRecipeList,
  refreshing,
  onRefresh,
  navigation,
}) => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  return (
    <View>
      <Text style={styles.title}>Bookmark</Text>
      {!savedRecipeList ? (
        <Text>No recipe saved</Text>
      ) : (
        <FlatList
          data={savedRecipeList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={1}
          marginBottom={100}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SavedRecipe
              id={item.id}
              recipeTitle={item.name}
              recipeImage={item.image}
              navigation={navigation}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    marginLeft: 20,
    fontWeight: "bold",
    width: 250,
    marginBottom: 20,
    marginTop: 20,
    overflow: "hidden",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderColor: "#808080",
    borderWidth: 0.5,
    marginRight: 10,
  },
  searchIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
  },
  button: {
    backgroundColor: "#1a995c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RecipeSavedList;
