import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { palette, styles as globalStyles } from '../generalStyles'


export default function Button({ children, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: palette.white,
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginTop: 100,
        borderRadius: 6
    },
    buttonText: {
        ...globalStyles.text,
        fontSize: 18,
        color: palette.raisin
    }
})