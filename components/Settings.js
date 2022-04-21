import { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


const SETTINGS_STORAGE_KEY = 'settings'
const SettingsContext = createContext([{}, () => console.log('Settings not mounted yet.') ])


export function useSettings() {
    return useContext(SettingsContext)
}


export default function SettingsProvider({ children }) {

    const [settings, setSettings] = useState({})

    // read settings on mount
    useEffect(async () => {
        try {
            const storedSettings = JSON.parse(await AsyncStorage.getItem(SETTINGS_STORAGE_KEY) || '{}')
            setSettings(storedSettings || {})
        }
        catch(error) {
            setSettings({})
        }
    }, [])

    // write settings on change
    useEffect(async () => {
        await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    }, [settings])

    // modify settings state with new settings
    const writeSettings = newSettings => {
        setSettings(prev => ({ ...prev, ...newSettings }))
    }

    return (
        <SettingsContext.Provider value={[settings, writeSettings]}>
            {children}
        </SettingsContext.Provider>
    )
}
