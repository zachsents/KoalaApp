import { useState } from 'react'
import {
    Text, View, Image, PermissionsAndroid, ActivityIndicator
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import Button from './Button'
import DataTable from './DataTable'
import { palette, styles } from '../generalStyles'

import { useStateList } from '../hooks'


// Bluetooth states
const UNCONNECTED = 'unconnected'
const SCANNING = 'scanning'
const CONNECTING = 'connecting'
const CONNECTED = 'connected'

const MEASUREMENT_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'


export default function BluetoothView({ bleManager, setDeviceConnection }) {

    // Stateful stuff
    const [connState, setConnState] = useState(UNCONNECTED)
    const [discoveredDevices, _, addDiscoveredDevice] = useStateList([], 'id')

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
            // device.name && addDiscoveredDevice(device)
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
                
                // find readable characteristics
                const characteristics = (await Promise.all(
                    services.map(async service => {
                        return (await device.characteristicsForService(service.uuid))
                            .filter(c => c.isReadable)
                    })
                )).flat()

                // TO DO: look for writable characteristic for 2-way comms
                // TO DO: differentiate between measurement and error characteristics

                setDeviceConnection({
                    device, characteristics
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
                    <Button onPress={scanForDevices}>Pair a Device</Button>
                )
            case SCANNING:
                return <DataTable onPress={connectDevice} list={
                    discoveredDevices.map(d => ({ key: d.id, label: d.name }))
                } />
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