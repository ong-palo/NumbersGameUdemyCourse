import {StyleSheet, Text, View} from "react-native";
import Colors from "../../util/colors";

function GuessLogItem({round, guess}) {
    return (
        <View style={styles.listItem}>
            <Text style={styles.listItemText}>#{round}</Text>
            <Text style={styles.listItemText}>Opponent's guess: {guess}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        backgroundColor: Colors.primary700,
        padding: 12,
        marginVertical: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        width: '100%'
    },
    listItemText: {
        color: Colors.accent500
    }
})

export default GuessLogItem;