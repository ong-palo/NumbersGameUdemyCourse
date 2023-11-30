import {Dimensions, StyleSheet, View} from "react-native";
import Colors from "../../util/colors";

function Card({children}) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        padding: 16,
        marginTop: deviceWidth < 380 ? 10 : 36,
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
});

export default Card;