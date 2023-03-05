
import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
import { View, Text, BackHandler, Pressable, Image } from 'react-native';
import TextBox from '../components/TextInput';
import DropDown from '../components/DropDown';
import MapView from '../components/MapView';


export default AddInfo = ({ navigation, route }) => {
    useLayoutEffect(() => {
        const backListener = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => backListener.remove()
    }, [])
    const handleBackButtonClick = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
        const image = route?.params?.image;
        console.log(image, "image")
        if (image) {
            // setDp(image)
        }
    }, [route.params?.image])

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [dp, setDp] = useState('')
    const [skill, setSkill] = useState('')
    const [location, setLocation] = useState('')
    const MapRef = useRef(null)

    const skills = [
        { label: 'ReactJs', value: 'ReactJs' },
        { label: 'React Native', value: 'React Native' },
        { label: 'NodeJs', value: 'NodeJs' },
        { label: 'C++', value: 'C++' },
        { label: 'Java', value: 'Java' }
    ]

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                <Pressable style={{
                    borderColor: "#00aaff",
                    backgroundColor: 'black',
                    height: 134,
                    width: 134,
                    borderRadius: 134 / 2,
                    borderWidth: 5,
                    alignSelf: "center",
                    marginBottom: 20,
                }} onPress={() => navigation.navigate('Camera')}>
                    {dp ?
                        <Image style={{
                            height: 120,
                            width: 120,
                            borderRadius: 60
                        }}
                            source={{ uri: dp }} resizeMode={'cover'} />
                        :
                        <Image style={{
                            height: 41,
                            width: 73,
                            alignSelf: 'center',
                            top: 40
                        }}
                            source={require('../images/addPic.png')} resizeMode={'stretch'} />}
                </Pressable>
                <TextBox
                    label={'Name'}
                    value={name}
                    onChange={(val) => setName(val)}
                    maxLength={20}
                    placeholder={'Enter Name'}
                />
                <TextBox
                    label={'Age'}
                    value={age}
                    onChange={(val) => setAge(val)}
                    maxLength={3}
                    placeholder={'Enter Age'}
                />
                <DropDown
                    value={skill}
                    data={skills}
                    onChange={(val) => setSkill(val?.value)}
                    placeholder={'Select skill'}
                    label={'Tech Stack'}
                />
                <MapView />
            </View>
        </View>
    )
}