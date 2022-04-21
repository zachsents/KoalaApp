import { View, Text, StyleSheet, Switch } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { useBluetooth } from '../components/Bluetooth'
import { useSettings } from '../components/Settings'
import Space from '../components/Space'


export default function Device() {

    const { deviceConnection, lastDataPoint, lastError } = useBluetooth()
    const [settings, writeSettings] = useSettings()
    
    const styles = createStyles(useTheme())

    
    return (
        <View style={styles.view}>
            <Text style={styles.title}>{deviceConnection.device.name}</Text>
            <Text style={styles.deviceState}>Connected</Text>
            <Space />

            <Text style={styles.setting} >Share data to public database</Text>
            <Text style={styles.settingDescription}>
                Contribute to the citizen science database by allowing your air quality data to be
                anonymously uploaded and shared.
            </Text>
            <Switch
                trackColor={{ false: "#cccccc", true: "#cccccc" }}
                thumbColor={settings.shareData ? "#66bb6a" : "#f4f3f4"}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={() => writeSettings({ shareData: !settings.shareData })}
                value={settings.shareData}
                style={styles.switch}
            />

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
        fontSize: 40
    },
    deviceState: {
        fontSize: 18,
        color: theme.colors.spectrum[0]
    },
    error: {
        color: theme.colors.spectrum[5],
        fontWeight: '600'
    },
    setting: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    settingDescription: {
        fontSize: 18
    },
    switch: {
        transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }],
        marginTop: 20,
        marginRight: 'auto'
    }
})
