
import React, { useLayoutEffect } from 'react'
import { View, Text, BackHandler } from 'react-native'


export default ViewInfo = ({ navigation, route }) => {
    useLayoutEffect(() => {
        const backListener = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => backListener.remove()
    }, [])
    const handleBackButtonClick = () => {
        navigation.goBack()
        return true;
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Text style={{ color: 'white' }}>
                view
            </Text>
        </View>
    )
}