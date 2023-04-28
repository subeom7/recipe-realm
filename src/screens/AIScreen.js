import { Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import "react-native-url-polyfill/auto";
import { Configuration, OpenAIApi } from "openai";
import { StyleSheet } from "react-native";
import { Button, ButtonGroup, withTheme } from "@rneui/themed";
import { Analytics } from "aws-amplify";
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const AIScreen = () => {
  // AWS analytics
  useEffect(() => {
    Analytics.record("AI Page Visit");
  }, []);

  const [randomMeal1, setRandomMeal1] = useState("");
  const [randomMeal1Image, setRandomMeal1Image] = useState("");

  const [randomMeal2, setRandomMeal2] = useState("");
  const [randomMeal2Image, setRandomMeal2Image] = useState("");

  const [randomMeal3, setRandomMeal3] = useState("");
  const [randomMeal3Image, setRandomMeal3Image] = useState("");

  const [randomMeal4, setRandomMeal4] = useState("");
  const [randomMeal4Image, setRandomMeal4Image] = useState("");

  async function callOpenAIGetFood(type) {
    let prompt =
      "Suggest a random " +
      type +
      " I will eat in the format of:\nFood: foodname";
    console.log(prompt);

    if (type) {
      await openai
        .createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 1,
          max_tokens: 100,
          top_p: 1.0,
          frequency_penalty: 1.0,
          presence_penalty: 0.0,
        })
        .then((data) => {
          setRandomMeal1(data.data.choices[0].text);
          callOpenAIGetImage(data.data.choices[0].text.substring(8), 1);
        });

      setTimeout(() => {
        console.log("One second has passed!");
      }, 1000);

      await openai
        .createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 1,
          max_tokens: 100,
          top_p: 1.0,
          frequency_penalty: 1.0,
          presence_penalty: 0.0,
        })
        .then((data) => {
          setRandomMeal2(data.data.choices[0].text);
          callOpenAIGetImage(data.data.choices[0].text.substring(8), 2);
        });

      setTimeout(() => {
        console.log("One second has passed!");
      }, 1000);

      await openai
        .createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 1,
          max_tokens: 100,
          top_p: 1.0,
          frequency_penalty: 1.0,
          presence_penalty: 0.0,
        })
        .then((data) => {
          setRandomMeal3(data.data.choices[0].text);
          callOpenAIGetImage(data.data.choices[0].text.substring(8), 3);
        });

      setTimeout(() => {
        console.log("One second has passed!");
      }, 1000);

      await openai
        .createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 1,
          max_tokens: 100,
          top_p: 1.0,
          frequency_penalty: 1.0,
          presence_penalty: 0.0,
        })
        .then((data) => {
          setRandomMeal4(data.data.choices[0].text);
          callOpenAIGetImage(data.data.choices[0].text.substring(8), 4);
        });
    }
  }

  async function callOpenAIGetImage(foodName, number) {
    await openai
      .createImage({
        prompt: foodName,
        n: 1,
        size: "1024x1024",
      })
      .then((data) => {
        switch (number) {
          case 1:
            setRandomMeal1Image(data.data.data[0].url);
          case 2:
            setRandomMeal2Image(data.data.data[0].url);
          case 3:
            setRandomMeal3Image(data.data.data[0].url);
          case 4:
            setRandomMeal4Image(data.data.data[0].url);
        }
      });
  }

  const renderText1 = () => {
    if (randomMeal1 !== "") {
      return (
        <Text style={{ flex: 1, flexWrap: "wrap", fontWeight: "bold" }}>
          {randomMeal1}
        </Text>
      );
    } else {
      return <Text style={{ flex: 1, flexWrap: "wrap" }}>No Food 1</Text>;
    }
  };

  const renderText2 = () => {
    if (randomMeal2 !== "") {
      return (
        <Text style={{ flex: 1, flexWrap: "wrap", fontWeight: "bold" }}>
          {randomMeal2}
        </Text>
      );
    } else {
      return <Text style={{ flex: 1, flexWrap: "wrap" }}>No Food 2</Text>;
    }
  };

  const renderText3 = () => {
    if (randomMeal3 !== "") {
      return (
        <Text style={{ flex: 1, flexWrap: "wrap", fontWeight: "bold" }}>
          {randomMeal3}
        </Text>
      );
    } else {
      return <Text style={{ flex: 1, flexWrap: "wrap" }}>No Food 3</Text>;
    }
  };

  const renderText4 = () => {
    if (randomMeal4 !== "") {
      return (
        <Text style={{ flex: 1, flexWrap: "wrap", fontWeight: "bold" }}>
          {randomMeal4}
        </Text>
      );
    } else {
      return <Text style={{ flex: 1, flexWrap: "wrap" }}>No Food 4</Text>;
    }
  };

  const renderImage1 = () => {
    if (randomMeal1Image !== "") {
      return (
        <Image
          style={{
            width: 160,
            height: 160,
            borderRadius: 30,
          }}
          source={{ uri: randomMeal1Image }}
        />
      );
    }
  };

  const renderImage2 = () => {
    if (randomMeal2Image !== "") {
      return (
        <Image
          style={{
            width: 160,
            height: 160,
            borderRadius: 30,
          }}
          source={{ uri: randomMeal2Image }}
        />
      );
    }
  };

  const renderImage3 = () => {
    if (randomMeal3Image !== "") {
      return (
        <Image
          style={{
            width: 160,
            height: 160,
            borderRadius: 30,
          }}
          source={{ uri: randomMeal3Image }}
        />
      );
    }
  };

  const renderImage4 = () => {
    if (randomMeal4Image !== "") {
      return (
        <Image
          style={{
            width: 160,
            height: 160,
            borderRadius: 30,
          }}
          source={{ uri: randomMeal4Image }}
        />
      );
    }
  };

  return (
    <View style={{ alignItems: "center", paddingHorizontal: 50 }}>
      <Text style={{ fontSize: 30, marginTop: 70, fontWeight: "bold" }}>
        AI Recommendation
      </Text>

      <View style={style.fixToText}>
        <Button
          style={style.fourButtons}
          onPress={() => callOpenAIGetFood("Breakfast")}
          title="Breakfast"
          titleStyle={{ fontSize: 15 }}
        />
        <Button
          style={style.fourButtons}
          onPress={() => callOpenAIGetFood("Lunch")}
          title="Lunch"
          titleStyle={{ fontSize: 15 }}
        ></Button>
        <Button
          style={style.fourButtons}
          onPress={() => callOpenAIGetFood("Dinner")}
          title="Dinner"
          titleStyle={{ fontSize: 15 }}
        ></Button>
        <Button
          style={style.fourButtons}
          onPress={() => callOpenAIGetFood("Dessert")}
          title="Dessert"
          titleStyle={{ fontSize: 15 }}
        ></Button>
      </View>

      <View style={style.fixToText2Top}>
        {renderImage1()}

        {renderImage2()}
      </View>

      <View style={style.fixToText3}>
        {renderText1()}

        {renderText2()}
      </View>

      <View style={style.fixToText2Top}>
        {renderImage3()}

        {renderImage4()}
      </View>
      <View style={style.fixToText3}>
        {renderText3()}

        {renderText4()}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  fourButtons: {
    width: 90,
    marginTop: 10,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 3,
    marginTop: 15,
  },
  fixToText2: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
  },
  fixToText2Top: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
  },
  fixToText3: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AIScreen;
