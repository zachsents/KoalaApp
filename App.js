import { useEffect, useState } from 'react'

import { BluetoothProvider } from './components/Bluetooth'

import Dashboard from './screens/Dashboard'
import Map from './screens/Map'
import Device from './screens/Device'

import Navigation from './components/Navigation'
import { LightTheme } from './theme'


// App states
const BLUETOOTH = 'bluetooth'
const DASHBOARD = 'dashboard'


export default function App() {

    // View state machine
    const [appState, setAppState] = useState(DASHBOARD)


    // // Look for changes in the device connection
    // useEffect(() => {
    //     deviceConnection?.device && setAppState(DASHBOARD)
    // }, [deviceConnection])
    

    return (
        <BluetoothProvider>
            <Navigation
                theme={LightTheme}
                labels={['Dashboard', 'Map', 'Device']}>
                <Dashboard />
                <Map />
                <Device displayBadgeForError />
            </Navigation>
        </BluetoothProvider>
    )
}