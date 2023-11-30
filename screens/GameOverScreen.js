import {Dimensions, Image, StyleSheet, Text, View, useWindowDimensions, ScrollView} from "react-native";
import Colors from "../util/colors";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useEffect} from "react";

function GameOverScreen({rounds, pickedNumber, onRestart}) {
    const {width, height} = useWindowDimensions();

    let imageSize = 300;
    if (width < 380) {
        imageSize = 150;
    }
    if (height < 400) {
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }

    useEffect(() => {
        console.log('Game over rounds: ', rounds);
        console.log('Game over picked number: ', pickedNumber);
    }, []);

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title text='Game Over!'/>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.image} source={require('../assets/images/success.png')}/>
                </View>
                <View>
                    <Text style={styles.summaryText}>
                        Your phone needed <Text style={styles.highlight}>
                        {rounds}
                    </Text> rounds to guess the number <Text style={styles.highlight}>
                        {pickedNumber}
                    </Text>
                        .
                    </Text>
                </View>
                <PrimaryButton onPress={onRestart}>Start new game</PrimaryButton>
            </View>
        </ScrollView>
    )
}

const {
    width: deviceWidth,
    height: deviceHeight
} = Dimensions.get('window')

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: {
        width: deviceWidth < 380 ? 150 : 300,
        height: deviceWidth < 380 ? 150 : 300,
        borderRadius: deviceWidth < 380 ? 75 : 150,
        borderWidth: 3,
        borderColor: Colors.accent500,
        overflow: 'hidden',
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        marginBottom: 24,
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center'
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
});

export default GameOverScreen;