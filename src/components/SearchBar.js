// components/SearchBar.js
import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SearchBar = ({ search, setSearch, searchRecipes }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Search for recipes"
      />
      <Button title="Search" onPress={searchRecipes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default SearchBar;
