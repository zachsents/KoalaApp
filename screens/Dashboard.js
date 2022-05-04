import { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'

import CircleIndicator from '../components/CircleIndicator'
import Group from '../components/Group'
import Space from '../components/Space'
import { useBluetooth } from '../components/Bluetooth'


export default function Dashboard() {

    const { lastDataPoint } = useBluetooth()

    const time = new Date()

    return (
        <>
            {/* <Text>
          {lastDataPoint?.time}
        </Text> */}

            <ScrollView style={styles.view}>
                <Group style={styles.groups} >
                    <CircleIndicator label='AQI' number={lastDataPoint?.aqi?.toFixed(0)} max={500} size={120} />
                </Group>
                <Group style={styles.groups} >
                    <CircleIndicator label='CO' number={lastDataPoint?.co?.toFixed(1)} max={50} unit='ppm' />
                    <CircleIndicator label='NO₂' number={lastDataPoint?.no2?.toFixed(0)} max={2050} unit='ppb' />
                </Group>
                <Group style={styles.groups} >
                    <CircleIndicator label='SO₂' number={lastDataPoint?.so2?.toFixed(0)} max={1000} unit='ppb' />
                    <CircleIndicator label='Ozone' number={lastDataPoint?.ozone?.toFixed(3)} max={0.6} unit='ppm' />
                </Group>
                <Group style={styles.groups} >
                    <CircleIndicator label='PM' number={lastDataPoint?.pm25?.toFixed(0)} max={500} unit='μg/m³' />
                </Group>
                <Space />
                <Space size={100} />
            </ScrollView>
        </>
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
