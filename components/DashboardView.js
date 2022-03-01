import { Buffer } from 'buffer'
import { useEffect, useState } from 'react'
import {
    Text, View, Image, TouchableOpacity,
    ScrollView, PermissionsAndroid, ActivityIndicator, StyleSheet
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { palette, styles } from '../generalStyles'


// Need to use regular variable for packet reception b/c
// async state changes may not be fast enough
var incompleteData = ''


export default function DashboardView({ deviceConnection }) {

    // Stateful stuff
    const [data, setData] = useState([])
    const addData = dataPoint => {
        setData(prevData => [dataPoint, ...prevData])
    }


    // Triggered when notifications come in over Bluetooth
    function watchForNotifications(error, char) {
        if (error) {
            console.log(error)
            return
        }

        // Receive packets starting with { and ending with }
        let packet = Buffer.from(char.value, 'base64').toString()
        incompleteData = (packet.startsWith('{') ? '' : incompleteData) + packet
        if (incompleteData.endsWith('}')) {
            try {
                addData(JSON.parse(incompleteData))
                console.log(`Received complete packet:\n\t${incompleteData}`)
            } finally {
                incompleteData = ''
            }
        }
    }


    // Mounting
    useEffect(() => {
        // Watch for notifications
        deviceConnection?.characteristic?.monitor(watchForNotifications)
    }, [deviceConnection])


    return (
        <View style={localStyles.container}>
            {deviceConnection && <>
                <Text style={styles.h1}>{deviceConnection.device.name}</Text>
            </>}
            <View style={{ ...styles.list, height: 400 }}>
                <ScrollView>{
                    data.map((dataPoint, i) => 
                        <Text key={i} style={{ ...styles.listItem, ...styles.text }}>{JSON.stringify(dataPoint)}</Text>
                    )
                }</ScrollView>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.raisin,
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: palette.white,
        paddingTop: 100
    },
})