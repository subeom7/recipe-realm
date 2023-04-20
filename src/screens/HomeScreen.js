import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import RecipeOfTheDay from '../components/RecipeOfTheDay';
// import { API_KEY } from '@env';

const HomeScreen = ({ navigation }) => {
  // const [recipeOfTheDay, setRecipeOfTheDay] = useState(null);

  // useEffect(() => {
  //   fetchRecipeOfTheDay();
  // }, []);

  // const fetchRecipeOfTheDay = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://api.spoonacular.com/recipes/random',
  //       {
  //         params: {
  //           apiKey: process.env.API_KEY,
  //           number: 1,
  //         },
  //       }
  //     );
  //     setRecipeOfTheDay(response.data.recipes[0]);
  //   } catch (error) {
  //     console.error('Error fetching recipe of the day:', error);
  //   }
  // };

  // if (!recipeOfTheDay) {
  //   return <Text>Loading...</Text>;
  // }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Recipe of the Day</Text>
      <RecipeOfTheDay recipe={recipeOfTheDay} navigation={navigation} /> */}
      <ScrollView style={{ padding: 30 }}>
      <Text style={{ color: '#676964', paddingBottom: 5 }}>Hello,</Text>
        <View style={styles.header}>
          <Text style={styles.title}>What would you like to cook today?</Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require('../assets/user-profile.jpeg')}
              style={{ width: 45, height: 45, top: -20}}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView >
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    width: 250,
    marginBottom: 10,
    overflow: 'hidden',
  },
});

export default HomeScreen;
