import React from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropDown = (props) => {
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
                labelField={'label'}
                valueField={'value'}
                maxHeight={160}
                style={{
                    width: '100%',
                    height: 35,
                    borderWidth: 1,
                    marginTop: 10,
                    marginBottom: 10,
                    paddingRight: 10
                }}
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
                    paddingLeft: 15
                }}
                itemContainerStyle={{
                    marginVertical: -6,
                    marginLeft: -2,
                }}
                containerStyle={{
                    marginTop: -2,
                    borderWidth: 1,
                    borderColor: 'black',
                }}
                activeColor="grey"
                itemTextStyle={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: 'black',
                }}
                {...props}
            />
        </View>
    );
};

export default DropDown;