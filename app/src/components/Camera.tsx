import React, { useRef } from 'react';
import { View, TouchableOpacity, Linking, Platform, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera';
import { PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions';



export default Camera = ({ navigation }) => {
    const camRef = useRef(null)
    const GoSettings = async () => {
        if (Platform.OS === 'ios') {
            await Linking.openURL('app-settings:');
        }
        if (Platform.OS === 'android') {
            await Linking.openSettings();
        }
    }

    const openAlert = () => {
        Alert.alert(
            'Camera Permission Required',
            'Taking image by capturing a photo requires access to your camera',
            [
                {
                    text: 'OK',
                    onPress: () => GoSettings()
                }
            ],
            { cancelable: false }
        );
    }
    const handleCameraPermission = async () => {
        if (Platform.OS === 'ios') {
            const res = await checkMultiple([PERMISSIONS.IOS.CAMERA]);
            if (res[PERMISSIONS.IOS.CAMERA] == RESULTS.BLOCKED) {
                openAlert();
            } else if (res[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED) {
                takePicture();
            } else if (res[PERMISSIONS.IOS.CAMERA] === RESULTS.LIMITED) {
                requestMultiple([PERMISSIONS.IOS.CAMERA]).then((res2) => {
                    if (res2[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED) {
                        takePicture();
                    }
                })
            } else if (res[PERMISSIONS.IOS.CAMERA] === RESULTS.DENIED) {
                requestMultiple([PERMISSIONS.IOS.CAMERA]).then((res2) => {
                    if (res2[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED) {
                        takePicture();
                    }
                })
            }
        }

        if (Platform.OS === 'android') {

            const res = await checkMultiple([PERMISSIONS.ANDROID.CAMERA]);

            if (res[PERMISSIONS.ANDROID.CAMERA] == RESULTS.BLOCKED) {
                openAlert();
            }
            else if (res[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED) {
                takePicture();
            }
            else if (res[PERMISSIONS.ANDROID.CAMERA] === RESULTS.DENIED) {

                const res2 = await requestMultiple([PERMISSIONS.ANDROID.CAMERA]);

                if (res2[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED) {
                    takePicture();
                } else if (res2[PERMISSIONS.ANDROID.CAMERA] === RESULTS.BLOCKED) {
                    openAlert();
                }
            }
        }
    };


    const takePicture = async () => {
        const options = {
            quality: 1,
            base64: true,
            fixOrientation: true,
            orientation: RNCamera.Constants.Orientation.auto
        };
        const data = await camRef.current.takePictureAsync(options);
        if (data.uri) {
            navigation.navigate('Add Information', { image: data.uri })
        }
    };

    return (
        <>
            <RNCamera
                ref={camRef}
                captureAudio={false}
                style={{ flex: 1 }}
                type={RNCamera.Constants.Type.front}
                defaultOnFocusComponent={true}
                ratio={'4:4'}
                playSoundOnCapture={false}
                playSoundOnRecord={false}
                defaultVideoQuality={480}
                cameraProps={{ captureAudio: false }}
            ></RNCamera>
            <TouchableOpacity
                onPress={handleCameraPermission}>
                <View style={{
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    marginVertical: 10,
                    backgroundColor: 'black',
                    alignSelf: 'center'
                }}>
                </View>
            </TouchableOpacity>
        </>
    )
}