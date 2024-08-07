import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title,handlePress,containerStyles,TextStyles,isLoading}) => {
  
  
  return (
    <TouchableOpacity //used for button
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-orange-500 rounded-xl ${containerStyles} ${isLoading?'opacity-50':''}`}
    disabled={isLoading}
    >
        <Text className={`${TextStyles}`}> {title} </Text>
    </TouchableOpacity>
  )
}

export default CustomButton