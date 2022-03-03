import {
    View, ScrollView, TouchableOpacity, Text,
    StyleSheet 
} from 'react-native'

import { palette, styles as globalStyles } from '../generalStyles'

export default function DataTable({ list, onPress = () => {}, style }) {
    return (
        <View style={{ ...styles.list, ...style }}>
            <ScrollView>{
                list.map(({ label, key }) =>
                    <TouchableOpacity key={key} onPress={() => onPress(key)} style={styles.listItem}>
                        <Text style={globalStyles.text}>{label}</Text>
                    </TouchableOpacity>)
            }</ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        marginTop: 100,
        backgroundColor: palette.whiteOverlay,
        width: '75%',
        height: 300,
        borderRadius: 6
    },
    listItem: {
        paddingVertical: 20,
        paddingHorizontal: 40
    },
})