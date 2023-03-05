import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropDown = (props) => {
    // const [isFocus,
    //   setIsFocus] = useState(false);
    console.log(props, "hffb")
    return (
        <View style={{
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <Text style={{
                fontSize: 16,
                fontWeight: '700',
                color: 'black',
            }}>{props.label}</Text>
            <Dropdown
                iconColor={'black'}
                maxHeight={160}
                style={{
                    width: '100%',
                    height: 42,
                    borderWidth: 1,
                    borderColor: 'black',
                    backgroundColor: 'transparent',
                    // borderBottomLeftRadius: dropDownDirection !== 'top' && isFocus ? 0 : 5,
                    // borderBottomRightRadius: dropDownDirection !== 'top' && isFocus ? 0 : 5,
                    // borderTopLeftRadius: dropDownDirection === 'top' && isFocus ? 0 : 5,
                    // borderTopRightRadius: dropDownDirection === 'top' && isFocus ? 0 : 5,
                    marginTop: 8,
                    marginBottom: 4,
                    paddingRight: 10
                }}
                dropdownPosition={'bottom'}
                placeholderStyle={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: 'grey',
                    paddingLeft: 15
                }}
                selectedTextStyle={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: 'black',
                    letterSpacing: 0.3,
                    // paddingLeft: 15
                }}
                itemContainerStyle={{
                    marginVertical: -6,
                    marginLeft: -2
                }}
                containerStyle={{
                    marginTop: -2,
                    backgroundColor: '#151D29',
                    borderWidth: 1,
                    borderColor: 'black',
                    borderTopStartRadius: 0,
                    borderTopEndRadius: 0,
                    borderBottomEndRadius: 5,
                    borderBottomStartRadius: 5,
                }}
                activeColor="transparent"
                itemTextStyle={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: 'red',
                }}

                {...props}
            //   onFocus={() => setIsFocus(true)}
            //   onBlur={() => setIsFocus(false)}
            />
        </View>
    );
};

export default DropDown;