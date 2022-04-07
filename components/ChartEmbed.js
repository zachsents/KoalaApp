import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { useState } from 'react'
import { useTheme } from '@react-navigation/native'


// /index.html is important here, as this is just stored in a 
// Google bucket that doesn't have any routing rules
const CHART_SERVICE_URL = 'https://storage.googleapis.com/chart-embed-service/index.html?height=450px'


export default function ChartEmbed({ chart }) {

    const [filter, setFilter] = useState('')
    const { colors } = useTheme()

    const uri = `${CHART_SERVICE_URL}&chart=${chart}&user=${filter.toLowerCase()}`

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }} >
            <WebView
                automaticallyAdjustContentInsets={false}
                source={{ uri }}
                style={{ backgroundColor: colors.background }}
            />
        </View>
    )
}