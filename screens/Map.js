import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { useTheme } from '@react-navigation/native'

import ChartEmbed from '../components/ChartEmbed'


const MAP_OPTIONS = {
    aqi: { label: 'Air Quality Index', chart: 'dd6158ec-dee4-422c-85e6-f0337b3f57dc' },
    co: { label: 'Carbon Monoxide', chart: '62133b23-c099-41fc-8008-7a2fca3dde21' },
    so2: { label: 'Sulfur Dioxide', chart: '2c6a72af-f81c-4533-bacc-198741ce8ad4' },
    no2: { label: 'Nitrogen Dioxide', chart: '2e72ac4d-01d4-4ec5-a413-4949652350c8' },
    pm: { label: 'Particulate Matter', chart: 'a04cecb2-6d69-4e2a-9681-c5305dfb68e1' },
    o3: { label: 'Ozone', chart: 'be7b7a4e-1ab6-4977-a0ff-76155a317b29' },
}


export default function Map() {

    const styles = createStyles(useTheme())
    const [selectedValue, setSelectedValue] = useState('aqi')

    return (
        <View style={styles.view}>
            <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                }>{
                    Object.entries(MAP_OPTIONS).map(([value, { label }]) =>
                        <Picker.Item label={label} value={value} key={value} />)
                }</Picker>
            <ChartEmbed chart={MAP_OPTIONS[selectedValue].chart} />
        </View >
    )
}

const createStyles = theme => StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    picker: {
        color: theme.colors.text,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }
})