import { useEffect, useState } from 'react'

import { BleManager } from 'react-native-ble-plx'

import BluetoothView from './components/BluetoothView'
import DashboardView from './components/DashboardView'

// App states
const BLUETOOTH = 'bluetooth'
const DASHBOARD = 'dashboard'


export default function App() {

    // View state machine
    const [appState, setAppState] = useState(BLUETOOTH)

    // Bluetooth-related states
    const [bleManager, setBLEManager] = useState(null)
    const [deviceConnection, setDeviceConnection] = useState(null)


    // Look for changes in the device connection
    useEffect(() => {
        deviceConnection?.device && setAppState(DASHBOARD)
    }, [deviceConnection])


    // Mount & unmount
    useEffect(() => {
        // destroyBLE(bleManager)
        setBLEManager(new BleManager())

        return () => {
            destroyBLE(bleManager)
            setBLEManager(null)
        }
    }, [])


    function renderView() {
        switch (appState) {
            case BLUETOOTH:
                return <BluetoothView bleManager={bleManager} setDeviceConnection={setDeviceConnection} />
            case DASHBOARD:
                return <DashboardView deviceConnection={deviceConnection} />
        }
    }

    return renderView()
}


function destroyBLE(manager) {
    try {
        manager && manager.destroy()
    } catch (err) {

    }
}