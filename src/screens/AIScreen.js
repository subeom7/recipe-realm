import { Button, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import 'react-native-url-polyfill/auto';
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const AIScreen = () => {
    const [randomMeal1, setRandomMeal1] = useState("");
    const [randomMeal1Image, setRandomMeal1Image] = useState("");

    const [randomMeal2, setRandomMeal2] = useState("");
    const [randomMeal2Image, setRandomMeal2Image] = useState("");

    const [randomMeal3, setRandomMeal3] = useState("");
    const [randomMeal3Image, setRandomMeal3Image] = useState("");

    const [randomMeal4, setRandomMeal4] = useState("");
    const [randomMeal4Image, setRandomMeal4Image] = useState("");

    async function callOpenAIGetFood(type) {
        let prompt = "Suggest a random " + type + " I will eat in the format of:\nFood: foodname"
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
            return <Text>{randomMeal1}</Text>;
        } else {
            return <Text>No Food 1</Text>;
        }
    };

    const renderText2 = () => {
        if (randomMeal2 !== "") {
            return <Text>{randomMeal2}</Text>;
        } else {
            return <Text>No Food 2</Text>;
        }
    };

    const renderText3 = () => {
        if (randomMeal3 !== "") {
            return <Text>{randomMeal3}</Text>;
        } else {
            return <Text>No Food 3</Text>;
        }
    };

    const renderText4 = () => {
        if (randomMeal4 !== "") {
            return <Text>{randomMeal4}</Text>;
        } else {
            return <Text>No Food 4</Text>;
        }
    };

    const renderImage1 = () => {
        if (randomMeal1Image !== "") {
            return (
                <Image
                    style={{
                        width: 100,
                        height: 100,
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
                        width: 100,
                        height: 100,
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
                        width: 100,
                        height: 100,
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
                        width: 100,
                        height: 100,
                    }}
                    source={{ uri: randomMeal4Image }}
                />
            );
        }
    };

    return (
        <View>
            <Button
                onPress={() => callOpenAIGetFood("Breakfast")}
                title="Breakfast"
            ></Button>
            <Button
                onPress={() => callOpenAIGetFood("Lunch")}
                title="Lunch"
            ></Button>
            <Button
                onPress={() => callOpenAIGetFood("Dinner")}
                title="Dinner"
            ></Button>
            <Button
                onPress={() => callOpenAIGetFood("Dessert")}
                title="Dessert"
            ></Button>
            {renderText1()}
            {renderImage1()}
            {renderText2()}
            {renderImage2()}
            {renderText3()}
            {renderImage3()}
            {renderText4()}
            {renderImage4()}
        </View>
    );
};

export default AIScreen;

