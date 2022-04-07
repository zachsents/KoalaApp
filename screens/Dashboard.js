import { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import CircleIndicator from '../components/CircleIndicator'
import Group from '../components/Group'
import Space from '../components/Space'
import { useBluetooth } from '../components/Bluetooth'

export default function Dashboard() {

    const { lastDataPoint } = useBluetooth()

    return (
        <ScrollView style={styles.view}>
            <Group style={styles.groups} >
                <CircleIndicator label='AQI' number={lastDataPoint?.aqi} max={400} size={120} />
            </Group>
            <Group style={styles.groups} >
                <CircleIndicator label='CO' number={lastDataPoint?.co} max={8000} unit='ppb' />
                <CircleIndicator label='NO₂' number={lastDataPoint?.no2} max={100} unit='ppm' />
            </Group>
            <Group style={styles.groups} >
                <CircleIndicator label='SO₂' number={lastDataPoint?.so2} max={100} unit='ppm' />
                <CircleIndicator label='Ozone' number={lastDataPoint?.ozone} max={100} unit='ppm' />
            </Group>
            <Group style={styles.groups} >
                <CircleIndicator label='PM' number={lastDataPoint?.pm25} max={100} unit='ppm' />
            </Group>
            <Space />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 40,
    }, 
    groups: {
        marginBottom: 20,
    }
})