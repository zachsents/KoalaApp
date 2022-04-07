import * as React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useBluetooth } from './Bluetooth'

// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons'


const Tab = createBottomTabNavigator()


export default function Navigation({ labels, children, ...props }) {

    const { lastError } = useBluetooth()

    return (
        <NavigationContainer {...props}>
            <Tab.Navigator>{
                children?.map((child, i) =>
                    <Tab.Screen
                        key={i}
                        name={labels[i]}
                        children={() => child}
                        options={
                            child.props.displayBadgeForError && lastError && { tabBarBadge: '!' }
                        }
                    />
                )
            }</Tab.Navigator>
        </NavigationContainer>
    )
}