import { useEffect, useState } from 'react'

import { BluetoothProvider } from './components/Bluetooth'

import Dashboard from './screens/Dashboard'
import Map from './screens/Map'
import Device from './screens/Device'

import Navigation from './components/Navigation'
import { LightTheme } from './theme'
import SettingsProvider from './components/Settings'


export default function App() {

    return (
        <SettingsProvider>
            <BluetoothProvider>
                <Navigation
                    theme={LightTheme}
                    labels={['Dashboard', 'Map', 'Device']}>
                    <Dashboard />
                    <Map />
                    <Device displayBadgeForError />
                </Navigation>
            </BluetoothProvider>
        </SettingsProvider>
    )
}