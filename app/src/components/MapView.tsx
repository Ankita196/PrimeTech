import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Linking, Platform, Alert, Pressable } from "react-native";
import MapView from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import { Marker } from "react-native-maps";
import { PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions';
import { USER_DATA } from '../reducers/constant';
import { useDispatch, useSelector } from "react-redux";

const Map = ({ disable }) => {
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.UserReducer?.userData)

    const openAlert = () => {
        Alert.alert(
            "Permission Required",
            "Location permission should be enabled to access your current postion",
            [
                {
                    text: "OK",
                    onPress: () => GoSettings()
                }
            ],
            {
                cancelable: false
            }
        );
        return true;
    };
    const GoSettings = async () => {
        if (Platform.OS === 'ios') {
            await Linking.openURL('app-settings:');
        }
        if (Platform.OS === 'android') {
            await Linking.openSettings();
        }
    };

    const requestLocation = async () => {
        if (Platform.OS === 'android') {
            const res = await checkMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
            if (res[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] == RESULTS.BLOCKED) {
                openAlert()
            }
            else if (res[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED) {
                getCurrentLocation();
            }
            else if (res[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.DENIED) {
                const res2 = await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
                if (res2[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED) {
                    getCurrentLocation();
                } else if (res2[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.BLOCKED) {
                    openAlert()
                }
            }
        }
        if (Platform.OS === 'ios') {
            const res = await checkMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
            if (res[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] == RESULTS.BLOCKED) {
                openAlert()
            }
            else if (res[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED) {
                getCurrentLocation();
            } else if (res[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.LIMITED) {
                requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then((res2) => {
                    if (res2[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED) {
                        getCurrentLocation();
                    } else if (res2[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.BLOCKED || res2[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.LIMITED) {
                        openAlert()
                    }
                })
            }
            else if (res[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.DENIED) {
                const res2 = await requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
                if (res2[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED) {
                    getCurrentLocation();
                } else if (res2[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.BLOCKED || res2[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.LIMITED) {
                    openAlert()
                }
            }
        }
    };

    // const [region, setRegion] = useState(userData?.location ?? {});

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                if (position?.coords?.latitude && position?.coords?.longitude) {
                    let myloaction = {
                        latitude: position?.coords?.latitude,
                        longitude: position?.coords?.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }
                    // setRegion(myloaction);
                    dispatch({ type: USER_DATA, payload: { ...userData, location: myloaction } });
                    mapRef.current.animateToRegion(myloaction, 2 * 1000);
                }
            },
            (error) => {
                console.log('errr ', error)
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 20000
            }
        );
    };

    return (
        <>
            {userData?.location && Object.keys(userData?.location).length > 0 ?
                <View style={styles.container} pointerEvents={disable ? 'none' : 'auto'}>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        initialRegion={userData?.location ?? {}}
                    // onRegionChangeComplete={(region) => setRegion(region)}
                    >
                        <Marker
                            coordinate={userData?.location ?? {}}
                            pinColor="pink"
                        />
                    </MapView>
                </View>
                :
                <Pressable onPress={requestLocation} style={[styles.container, { backgroundColor: 'black', justifyContent: 'center' }]}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: 'white',
                    }}>
                        Give Access to Location
                    </Text>
                </Pressable>}
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        top: 380,
        height: 170,
        width: '100%',
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    text: {
        fontSize: 20,
        backgroundColor: "lightblue",
    },
});

export default Map;