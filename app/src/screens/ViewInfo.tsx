
import React, { useLayoutEffect } from 'react'
import { View, Text, BackHandler, Image, Button } from 'react-native'
import { USER_DATA } from '../reducers/constant';
import { useDispatch, useSelector } from "react-redux";
import MapView from '../components/MapView';

export default ViewInfo = ({ navigation, route }) => {
    useLayoutEffect(() => {
        const backListener = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => backListener.remove()
    }, [])
    const handleBackButtonClick = () => {
        navigation.goBack()
        return true;
    };
    const dispatch = useDispatch();
    const userData = useSelector(state => state.UserReducer?.userData);

    return (
        <View style={{ flex: 1, marginHorizontal: 15 }}>
            {userData?.name ?
                <>
                    <View style={{
                        borderColor: "#00aaff",
                        backgroundColor: 'black',
                        height: 130,
                        width: 130,
                        borderRadius: 130 / 2,
                        borderWidth: 5,
                        alignSelf: "center",
                        marginVertical: 20,
                    }}>
                        {userData?.dp ?
                            <Image
                                style={{
                                    height: 120,
                                    width: 120,
                                    borderRadius: 60
                                }}
                                source={{ uri: userData?.dp }} resizeMode={'cover'}
                            />
                            :
                            <Image
                                style={{
                                    height: 41,
                                    width: 73,
                                    alignSelf: 'center',
                                    top: 40
                                }}
                                source={require('../images/addPic.png')} resizeMode={'stretch'}
                            />}
                    </View>
                    <View style={{
                        borderWidth: 2,
                        borderColor: 'black',
                        borderRadius: 10,
                        marginTop: 30
                    }}>
                        <View style={{ position: 'absolute', left: 20, top: -12, height: 24, paddingLeft: 15, paddingRight: 17, backgroundColor: 'grey', borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontWeight: '500' }}>{'Details'}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 15, paddingTop: 30, paddingBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>{'Name'}</Text>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>{userData?.name}</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: 'grey', marginVertical: 15 }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>{'Age'}</Text>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>{userData?.age}</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: 'grey', marginVertical: 15 }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>{'Tech skill'}</Text>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>{userData?.skill}</Text>
                            </View>
                        </View>
                    </View>
                    <MapView disable />
                    <View style={{ top: 570, flexDirection: 'row', position: 'absolute', justifyContent: 'space-between' }}>
                        <View style={{ width: '47%', marginRight: 10 }}>
                            <Button title='Edit' onPress={() => navigation.navigate('Add Information')} />
                        </View>
                        <View style={{ width: '47%', marginLeft: 10 }}>
                            <Button title='Reset' onPress={() => {
                                dispatch({ type: USER_DATA, payload: {} })
                                navigation.navigate('Add Information', { reset: true })
                            }} />
                        </View>
                    </View>
                </> :
                <Text style={{ fontSize: 22, color: 'black', fontWeight: '700', alignSelf: 'center', marginTop: 200 }}>No Data Found</Text>}
        </View >
    )
}