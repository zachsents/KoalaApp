import React from 'react'
import { View } from 'react-native'

export default function Group({ children, style }) {
    return (
        <View style={{
            ...style,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        }}>
            {children?.map ?
                children.map((child, i) => <View key={i}>{child}</View>) :
                <View>{children}</View>
            }
        </View>
    )
}
