import {Alert, FlatList, StyleSheet, Text, View, useWindowDimensions} from "react-native";
import Title from "../components/ui/Title";
import {useEffect, useState} from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../util/colors";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let min = 1;
let max = 100;

function GameScreen({pickedNumber, onGameOver}) {
    const initialGuess = generateRandomBetween(min, max, pickedNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guesses, setGuesses] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();
    // let content =

    useEffect(() => {
        console.log('Current guess: ', currentGuess)
        if (parseInt(currentGuess) === parseInt(pickedNumber)) {
            onGameOver(guesses.length);
            setCurrentGuess(0)
        }
    }, [currentGuess, pickedNumber, onGameOver]);

    useEffect(() => {
        min = 1;
        max = 100;
    }, [])

    function nextGuessHandler(direction) { // lower or higher
        if ((direction === 'lower' && currentGuess < pickedNumber) || (direction === 'higher' && currentGuess > pickedNumber)) {
            Alert.alert(
                "Dont lie",
                'You know its wrong',
                [
                    {
                        text: 'Sorry!',
                        style: 'destructive'
                    }
                ]
            )
            return;
        }
        if (direction === 'lower') {
            max = currentGuess;
        } else {
            min = currentGuess + 1;
        }
        const newRandomNumber = generateRandomBetween(min, max, currentGuess);
        setCurrentGuess(newRandomNumber);
        setGuesses((prevState) => [newRandomNumber, ...prevState])
    }

    function renderFlatList({item, index}) {
        return (
            // <View style={styles.listItemContainer}>
            //     <Text style={styles.listItemText}>{item}</Text>
            // </View>
            <GuessLogItem guess={item} round={guesses.length - index}/>
        )
    }

    return (
        <View style={styles.screen}>
            <Title text="Opponent's Guess"/>
            <NumberContainer text={currentGuess}/>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or Lower</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler('higher')}>
                            <Ionicons name='md-add' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton text='-' onPress={() => nextGuessHandler('lower')}>
                            <Ionicons name='md-remove' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList data={guesses} renderItem={renderFlatList} keyExtractor={(item) => item}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 12,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1,
    },
    instructionText: {
        marginBottom: 12
    },
    listContainer: {
        flex: 1,
        // marginTop: 30,
        padding: 16
    }
})

export default GameScreen;