import { StyleSheet } from "react-native"

export const palette = {
    raisin: '#232528',
    green: '#B9E3C6',
    lav: '#A09EBB',
    white: '#fff',
    iris: '#3D52D5',
    whiteOverlay: 'rgba(255,255,255,0.1)'
}

const text = {
    // fontFamily: 'Poppins',
    color: palette.white
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.raisin,
        alignItems: 'center',
        justifyContent: 'center',
        color: palette.white
    },
    h1: {
        ...text,
        fontSize: 48
    },
    text: {
        ...text
    },
    logo: {
        width: 150,
        height: 200,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: palette.white,
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginTop: 100,
        borderRadius: 6
    },
    buttonText: {
        ...text,
        fontSize: 18,
        color: palette.raisin
    },
    list: {
        marginTop: 100,
        backgroundColor: palette.whiteOverlay,
        width: '75%',
        height: 300,
        borderRadius: 6
    },
    listItem: {
        paddingVertical: 20,
        paddingHorizontal: 40
    },
    loading: {
        marginTop: 100
    }
})