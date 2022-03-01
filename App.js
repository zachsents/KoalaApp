import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


export default function App() {

    useEffect(() => {
        
    }, [])

    return (
        <View style={styles.container}>
            <Image source={
                require('./assets/logo-white.png')
            } style={styles.logo} />
            <Text style={styles.h1}>Let's get started.</Text>
            <TouchableOpacity onPress={() => { }} style={styles.button}>
                <Text style={styles.buttonText}>Pair a Device</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    )
}

const palette = {
    raisin: '#232528',
    green: '#B9E3C6',
    lav: '#A09EBB',
    white: '#fff'
}

const text = {
    // fontFamily: 'Poppins',
    color: palette.white
}

const styles = StyleSheet.create({
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
    }
})