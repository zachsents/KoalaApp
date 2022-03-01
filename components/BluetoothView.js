import { useState } from 'react'
import {
    Text, View, Image, TouchableOpacity,
    ScrollView, PermissionsAndroid, ActivityIndicator
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { palette, styles } from '../generalStyles'


// Bluetooth states
const UNCONNECTED = 'unconnected'
const SCANNING = 'scanning'
const CONNECTING = 'connecting'
const CONNECTED = 'connected'

const MEASUREMENT_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'


export default function BluetoothView({ bleManager, setDeviceConnection }) {

    // Stateful stuff
    const [connState, setConnState] = useState(UNCONNECTED)
    const [discoveredDevices, setDiscoveredDevices] = useState([])
    const addDiscoveredDevice = device => {
        // make sure list doesn't have ID
        if (!discoveredDevices.map(d => d.id).includes(device.id)) {
            console.log('Found device:', device.name)
            setDiscoveredDevices([device, ...discoveredDevices])
        }
    }

    // Search for devices
    async function scanForDevices() {
        // Get permission for fine location -- needed for BLE
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ])
        console.log(granted)

        // Scan for devices
        setConnState(SCANNING)
        console.log('Scanning for devices...')
        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log(error)
                // destroyBLE(bleManager)
                return
            }

            device.name?.startsWith('Koala') && addDiscoveredDevice(device)
        })
    }

    // Connect to device
    async function connectDevice(id) {
        // stop scanning
        bleManager.stopDeviceScan()
        setConnState(CONNECTING)

        // find device in list
        const device = discoveredDevices.find(d => d.id == id)

        console.log('Connecting to device:', device.name)

        // connect
        device.connect()
            .then(async device => {
                console.log('Connected')
                setConnState(CONNECTED)

                // search for services and characteristics
                await device.discoverAllServicesAndCharacteristics()
                const services = await device.services()

                // only interested in one service
                const characteristics = await device.characteristicsForService(MEASUREMENT_SERVICE)

                // look for readable characteristics
                const readChar = characteristics.find(c => c.isReadable)
                // TO DO: look for writable characteristic for 2-way comms

                setDeviceConnection({
                    device, characteristic: readChar
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    function renderConnectionComponents() {
        switch (connState) {
            case UNCONNECTED:
                return (
                    <TouchableOpacity onPress={scanForDevices} style={styles.button}>
                        <Text style={styles.buttonText}>Pair a Device</Text>
                    </TouchableOpacity>
                )
            case SCANNING:
                return (
                    <View style={styles.list}>
                        <ScrollView>{
                            discoveredDevices.map(({ name, id }) => (
                                <TouchableOpacity key={id} onPress={() => connectDevice(id)} style={styles.listItem}>
                                    <Text style={styles.text}>{name}</Text>
                                </TouchableOpacity>
                            ))
                        }</ScrollView>
                    </View>
                )
            case CONNECTED:
            case CONNECTING:
                return (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color={palette.iris} />
                    </View>
                )
        }
    }

    return (
        <View style={styles.container}>
            <Image source={
                require('../assets/logo-white.png')
            } style={styles.logo} />
            <Text style={styles.h1}>Let's get started.</Text>
            {renderConnectionComponents()}
            <StatusBar style="auto" />
        </View>
    )
}