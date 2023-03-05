import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Pressable, Image, TextInput } from 'react-native'

export default TextBox = (props) => {
    return (
        <>
            <Text style={{
                fontSize: 16,
                fontWeight: '700',
                color: 'black',
            }}>{props.label}</Text>
            <TextInput
                {...props}
                placeholderTextColor={'grey'}
                style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: 'black',
                    paddingVertical: 8,
                    paddingHorizontal: 15,
                    height: 35,
                    marginVertical: 10,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'black'
                }}
            />
        </>
    )
}