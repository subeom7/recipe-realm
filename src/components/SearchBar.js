// components/SearchBar.js
import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Octicons";

const SearchBar = ({ search, setSearch, searchRecipes }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon
          name="search"
          size={22}
          color="#808080"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder="Search for recipes"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={searchRecipes}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default SearchBar;
