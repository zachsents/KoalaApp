import { } from 'react'
import { StyleSheet } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'


export default function JustTable({ data }) {
    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Rows data={Object.entries(data)} textStyle={styles.text} />
            </Table>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
})