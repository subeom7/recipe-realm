import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SearchComponent from "../components/SearchComponent";
import CategoryList from "../components/CategoryList";
import WeekList from "../components/WeekList";
import RecommendList from "../components/RecommendList";
import MaterialIcons from "react-native-vector-icons/Octicons";
import { Analytics } from "aws-amplify";

const HomeScreen = ({ navigation }) => {
  // AWS analytics
  useEffect(() => {
    Analytics.record("Home Page Visit");
  }, []);

  const handlePress = () => {
    navigation.navigate("AI");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ padding: 30 }}
        contentContainerStyle={{ paddingBottom: 55 }}
      >
        <Text style={{ color: "#676964", paddingBottom: 5 }}>Hello,</Text>
        <View style={styles.mainHeader}>
          <Text style={styles.title}>What would you like to cook today?</Text>
          <TouchableOpacity onPress={handlePress} style={styles.icon}>
            {/* <ImageBackground
              source={require('../assets/bryan-cranston.jpg')}
              style={{ width: 45, height: 45, top: -20 }}
              imageStyle={{ borderRadius: 25 }}
            /> */}
            <MaterialIcons name="dependabot" color={"black"} size={30} />
          </TouchableOpacity>
        </View>
        <SearchComponent />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Categories</Text>
          <Text style={styles.more}>See all</Text>
        </View>
        <CategoryList />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recommendation</Text>
          <Text style={styles.more}>See all</Text>
        </View>
        <RecommendList />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>RecipesOfTheWeek</Text>
          <Text style={styles.more}>See all</Text>
        </View>
        <WeekList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f7f7f7",
  },
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    width: 250,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    overflow: "hidden",
  },
  icon: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "black",
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#1a995c',
  },
  more: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1a995c",
  },
});

export default HomeScreen;
