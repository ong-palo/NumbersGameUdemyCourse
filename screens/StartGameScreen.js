import {View, TextInput, Text, SafeAreaView, StyleSheet, Alert, Dimensions, useWindowDimensions, KeyboardAvoidingView, ScrollView} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useState} from "react";
import Colors from "../util/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({onPickedNumber}) {
    const [enteredNumber, setEnteredNumber] = useState('');

    const {width, height } = useWindowDimensions();

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    function resetInputHandler() {
        console.log('reset')
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);
        console.log('Chosen number: ', chosenNumber)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            // show alert
            Alert.alert(
                'Invalid number!',
                'Number has to be within 1 and 99.',
                [
                    {
                        text: 'OK',
                        style: 'destructive',
                        onPress: resetInputHandler
                    }
                ],
                {},
            )
            return;
        }
        onPickedNumber(enteredNumber);
    }

    const marginTop = height < 400 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior={'position'}>
                <View style={[styles.rootContainer, {marginTop}]}>
                    <View style={styles.titleContainer}>
                        <Title text={'Guess My Number!'}/>
                    </View>
                    <Card>
                        <InstructionText>Enter a number</InstructionText>
                        <TextInput
                            style={styles.input}
                            maxLength={2}
                            keyboardType='number-pad'
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={enteredNumber}
                            onChangeText={numberInputHandler}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>
                                    Reset
                                </PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>
                                    Confirm
                                </PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        marginTop: deviceHeight < 380 ? 30 : 100,
        alignItems: 'center'
    },
    titleContainer: {
        padding: 12
    },
    inputContainer: {
        // flex: 1,
        alignItems: 'center',
        padding: 16,
        marginTop: 36,
        marginHorizontal: 24,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        // android only property
        elevation: 4,
        // Shadow iOS
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 3
    },
    input: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    buttonContainer: {
        flex: 1
    },
    // inputTitle: {
    //     color: Colors.accent500,
    //     fontSize: 24,
    //     fontWeight: 'bold'
    // }
})

export default StartGameScreen;