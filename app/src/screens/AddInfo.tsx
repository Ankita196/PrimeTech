
import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
import { View, Button, BackHandler, Pressable, Image } from 'react-native';
import TextBox from '../components/TextInput';
import DropDown from '../components/DropDown';
import MapView from '../components/MapView';
import { USER_DATA } from '../reducers/constant';
import { useDispatch, useSelector } from "react-redux";

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
        const image = route?.params;
        if (image?.image) {
            setDp(image?.image)
        }
        const subscribe = navigation.addListener('focus', () => {
            if (route.params?.reset) {
                setName('')
                setAge('')
                setDp('')
                setSkill('')
            }
        });
        return subscribe;
    }, [route.params])

    const dispatch = useDispatch();
    const userData = useSelector(state => state.UserReducer?.userData)
    const [name, setName] = useState(userData?.name ?? '')
    const [age, setAge] = useState(userData?.age ?? '')
    const [dp, setDp] = useState(userData?.dp ?? '')
    const [skill, setSkill] = useState(userData?.skill ?? '')

    const skills = [
        { label: 'ReactJs', value: 'ReactJs' },
        { label: 'React Native', value: 'React Native' },
        { label: 'NodeJs', value: 'NodeJs' },
        { label: 'C++', value: 'C++' },
        { label: 'Java', value: 'Java' }
    ];

    const onSubmit = () => {
        dispatch({ type: USER_DATA, payload: { ...userData, name, age, dp, skill } })
        navigation.navigate('View')
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                <Pressable style={{
                    borderColor: "#00aaff",
                    backgroundColor: 'black',
                    height: 120,
                    width: 120,
                    borderRadius: 120 / 2,
                    borderWidth: 5,
                    alignSelf: "center",
                    marginBottom: 20,
                }} onPress={() => navigation.navigate('Camera')}>
                    {dp ?
                        <Image style={{
                            height: 110,
                            width: 110,
                            borderRadius: 55
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
                    onChangeText={(val) => setName(val)}
                    maxLength={20}
                    placeholder={'Enter Name'}
                />
                <TextBox
                    label={'Age'}
                    value={age}
                    onChangeText={(val) => setAge(val)}
                    maxLength={3}
                    placeholder={'Enter Age'}
                    keyboardType="phone-pad"
                />
                <DropDown
                    value={skill}
                    data={skills}
                    onChange={(val) => setSkill(val?.value)}
                    placeholder={'Select skill'}
                    label={'Tech Stack'}
                />
                <MapView disable={false} />
                <View style={{ position: 'absolute', top: 560, alignSelf: 'center', width: '100%' }}>
                    <Button
                        title='submit'
                        onPress={onSubmit}
                        disabled={name && age && dp && skill && userData?.location ? false : true}
                    />
                </View>
            </View>

        </View>
    )
}