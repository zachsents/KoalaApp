import * as React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useBluetooth } from './Bluetooth'

import { FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'


const Tab = createBottomTabNavigator()


export default function Navigation({ labels, children, ...props }) {

    const { lastError } = useBluetooth()

    return (
        <NavigationContainer {...props}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        switch(route.name) {
                            case 'Dashboard':
                                return <FontAwesome name="dashboard" size={size} color={color} />
                            case 'Map':
                                return <Entypo name="map" size={size} color={color} />
                            case 'Device':
                                return <MaterialIcons name="devices" size={size} color={color} />
                        }
                    },
                })}
            >{
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