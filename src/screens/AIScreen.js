import { Button, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import 'react-native-url-polyfill/auto';
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

function AIScreen() {
    const [randomMeal, setRandomMeal] = useState("");
    const [randomMealImage, setRandomMealImage] = useState("");
    const delay = ms => new Promise(res => setTimeout(res, ms));

    async function callOpenAIGetFood() {
        console.log("Calling the OpenAI API")

        await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Suggest a random food I will eat in the format of:\nFood:",
            temperature: 1,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        }).then((data) => {
            setRandomMeal(data.data.choices[0].text);
            callOpenAIGetImage(data.data.choices[0].text.substring(8))
        });
    }

    async function callOpenAIGetImage(foodName) {
        await openai.createImage({
            prompt: foodName,
            n: 1,
            size: "1024x1024",
        }).then((data) => {
            setRandomMealImage(data.data.data[0].url)
        });
    }

    const renderText = () => {
        if (randomMeal !== "") {
            return <Text>Meal is {randomMeal}</Text>
        }
        else {
            return <Text>Press the button first</Text>
        }
    }

    const renderImage = () => {
        if (randomMealImage !== "") {
            return <Image
                style={{width: '100%', height: 200,resizeMode : 'stretch' }}
                source={{uri: randomMealImage}}
            />
        }
    }

    return (
        <View>
            <Button onPress={callOpenAIGetFood} title="Press Me"></Button>
            {renderText()}
            {renderImage()}
        </View>
    );
}


export default AIScreen;
