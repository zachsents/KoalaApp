import { Buffer } from 'buffer'
import { useEffect, useState } from 'react'
import {
    Text, View, Image, TouchableOpacity,
    ScrollView, PermissionsAndroid, ActivityIndicator, StyleSheet
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { palette, styles as globalStyles } from '../generalStyles'
import { useStateList, useDatabase } from '../hooks'
import DataTable from './DataTable'
import Button from './Button'


// Need to use regular variable for packet reception b/c
// async state changes may not be fast enough
var incompleteData = ''
const insert = useDatabase()


export default function DashboardView({ deviceConnection }) {

    // Stateful stuff
    const [data, _, addData] = useStateList([], 'user')
    const [synced, setSynced] = useState(false)

    // Upload to database when sync is pressed
    async function sync() {
        setSynced(true)
        console.log('Pulling data')
        console.log('Syncing with database')
        console.log(await insert(data))
    }

    // Triggered when notifications come in over Bluetooth
    function watchForNotifications(error, char) {
        if (error) {
            console.log(error.toString())
            return
        }

        // Receive packets starting with < and ending with >
        let packet = Buffer.from(char.value, 'base64').toString()
        incompleteData = (packet.startsWith('<') ? '' : incompleteData) + packet
        if (incompleteData.endsWith('>')) {
            try {
                addData({
                    ...JSON.parse(incompleteData.replace(/[\<\>]/g, '')),
                    time: new Date().toLocaleString()
                })
                console.log(`Received complete packet:\n\t${incompleteData}`)
            } finally {
                incompleteData = ''
            }
        }

        // length check to not accumulate garbage
        if (incompleteData.length > 1000)
            incompleteData = ''
    }

    // Device connection mounted
    useEffect(() => {
        // Watch for notifications
        deviceConnection?.characteristics?.forEach(char => char.monitor(watchForNotifications))
    }, [deviceConnection])

    return (
        <View style={styles.container}>
            {deviceConnection && <>
                <Text style={globalStyles.h1}>{deviceConnection.device.name}</Text>
            </>}
            <Button onPress={sync}>Sync</Button>
            <Text style={{
                ...globalStyles.text,
                marginTop: 20
            }}>
                {data.length} measurement{data.length != 1 && 's'} received
            </Text>
            {synced && <Text style={{ color: 'green' }}>Success</Text>}
            <DataTable list={
                data.map((meas, i) => ({ key: i, label: JSON.stringify(meas) }))
            } style={styles.dataList} />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.raisin,
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: palette.white,
        paddingTop: 100
    },
    dataList: {
        height: 200
    }
})