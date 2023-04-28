import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

const SwitchComponent = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <SearchBar
        placeholder="Search any recipes"
        onChangeText={updateSearch}
        value={search}
        round={true}
        lightTheme={true}
        containerStyle={{
          backgroundColor: "transparent",
          borderWidth: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
        inputStyle={{ backgroundColor: "transparent", fontSize: 14 }}
        inputContainerStyle={{
          backgroundColor: "#FFFFFF",
          borderRadius: 30,
          width: "100%",
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
        searchIcon={() => <Icon name="search" size={22} color="#808080" />}
        leftIconContainerStyle={{ marginLeft: 16 }}
        showClearIcon={true}
        clearIcon={() => (
          <Icon
            name="filter"
            size={20}
            color="#808080"
            onPress={() => setSearch("")}
          />
        )}
        rightIconContainerStyle={{
          marginRight: 10,
          height: 30,
          borderLeftWidth: 0.5,
          borderColor: "#808080",
          paddingLeft: 10,
        }}
      />
    </View>
  );
};

export default SwitchComponent;
