import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useBluetooth } from '../components/Bluetooth'
import Space from '../components/Space'


export default function Device() {

    const { deviceConnection, lastDataPoint, lastError } = useBluetooth()
    const styles = createStyles(useTheme())


    return (
        <View style={styles.view}>
            <Text style={styles.title}>{deviceConnection.device.name}</Text>
            <Text style={styles.subtitle}>Connected</Text>
            <Space />
            {lastError && <>
                <Text style={styles.error} >Error:</Text>
                <Text style={styles.error} >{lastError.error}</Text>
            </>}
            <Space />
            {lastDataPoint && <>
                <Text>Last Data Point:</Text>
                <Text>{JSON.stringify(lastDataPoint)}</Text>
            </>}
        </View>
    )
}


const createStyles = theme => StyleSheet.create({
    view: {
        padding: 40
    },
    title: {
        fontSize: 36
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.spectrum[0]
    },
    error: {
        color: theme.colors.spectrum[5],
        fontWeight: '600'
    }
})