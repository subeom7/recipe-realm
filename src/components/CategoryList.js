import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";

const data = [
  {
    title: "Category 1",
    data: [
      { emoji: "🥞", name: "Breakfast" },
      { emoji: "🍣", name: "Lunch" },
      { emoji: "🍜", name: "Dinner" },
      { emoji: "🍰", name: "Dessert" },
      { emoji: "🍿", name: "Snack" },
    ],
  },
];

const CategoryList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.box}>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <Text style={styles.boxText}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <SectionList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      sections={data}
      renderItem={renderItem}
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
    alignItems: "center",
    marginRight: 10,
  },
  emoji: {
    fontSize: 30,
    alignItems: "center",
  },
  box: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 10,
    width: 80, // set a fixed width for the box
    height: 70, // set a fixed height for the box
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  boxText: {
    fontSize: 12,
    alignItems: "center",
    color: "#808080",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default CategoryList;
