import { StatusBar } from 'expo-status-bar';
import {ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import StartGameScreen from "./screens/StartGameScreen";
import {LinearGradient} from "expo-linear-gradient";
import {useEffect, useState} from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./util/colors";
import GameOverScreen from "./screens/GameOverScreen";
import {useFonts} from 'expo-font';
import AppLoading from "expo-app-loading";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync()

export default function App() {
    const [userNumber, setUserNumber] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [rounds, setRounds] = useState(0);

    const [fontsLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    // useEffect(() => {
    //
    // }, [userNumber, gameOver, rounds]);

    if (!fontsLoaded) {
        return <AppLoading />
    }

    function startGameHandler(enteredNumber) {
        setUserNumber(enteredNumber);
        setGameOver(false);
        setRounds(0);
    }

    function handleRestart() {
        console.log('restart')
        setRounds(0);
        setUserNumber(null);
        // setGameOver(false);
        console.log('(RESTART) Rounds: ', rounds);
        console.log('(RESTART) User number: ', userNumber)
        console.log('(RESTART) Game over bool: ', gameOver)
    }

    function incrementRounds() {
        setRounds((prevState) => {
            return prevState + 1
        })
    }

    let screen = <StartGameScreen onPickedNumber={startGameHandler}/>

    if (userNumber) {
        screen = <GameScreen pickedNumber={userNumber} onGameOver={gameOverHandler} />
    }

    if (gameOver && userNumber) {
        console.log('Game over: ', gameOver);
        console.log('user number: ', userNumber)
        screen = <GameOverScreen rounds={rounds} pickedNumber={userNumber} onRestart={handleRestart} />
    }

    function gameOverHandler(rounds) {
        setGameOver(true);
        setRounds(rounds);
    }

  return (
      <>
        <StatusBar style={'light'}/>
          <LinearGradient
              style={styles.rootScreen}
              colors={[
                  Colors.primary700,
                  Colors.accent500,
              ]}
          >
              <ImageBackground
                  source={require('./assets/images/background.png')}
                  resizeMode='cover'
                  style={styles.rootScreen}
                  imageStyle={styles.backgroundImage}
              >
                  {/*<StartGameScreen />*/}
                  <SafeAreaView style={styles.rootScreen}>
                      {screen}
                  </SafeAreaView>
              </ImageBackground>
          </LinearGradient>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootScreen: {
    flex: 1,
    // backgroundColor: '#ddb52f'
  },
    backgroundImage: {
      opacity: 0.15
    }
});
