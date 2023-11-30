import {StyleSheet, Text, Platform} from "react-native";
import Colors from "../../util/colors";

function Title({text}) {
    return (
        <Text style={styles.title}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.accent500,
        textAlign: 'center',
        padding: 12,
        borderWidth: Platform.select({
            ios: 0,
            android: 2
        }),
        borderColor: '#ddb52f',
        maxWidth: '80%',
        width: 300
    }
});

export default Title;