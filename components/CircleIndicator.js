import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'


export default function CircleIndicator({ label, number = 0, max = 100, size = 50, unit }) {

    const { colors } = useTheme()
    const fontSize = size / 3

    const color = colors.spectrum[Math.min(
        Math.floor(colors.spectrum.length * number / max),
        colors.spectrum.length - 1
    )]

    return (
        <ProgressCircle
            percent={100 * number / max}
            radius={size}
            borderWidth={size > 80 ? 12 : 8}
            color={color}
            shadowColor={colors.border}
            bgColor="#fff"
        >
            <Text style={{ fontSize }}>{label}</Text>
            <Text style={{ fontSize }}>{number}</Text>
            {unit && <Text style={{ fontSize: fontSize / 2 }}>{unit}</Text>}
        </ProgressCircle>
    )
}
