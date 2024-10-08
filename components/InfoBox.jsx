import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title,subtitle,containerStyles,titleStyles}) => {
  return (
    <View className={containerStyles}>
      <Text className={titleStyles}>{title}</Text>
      <Text>{subtitle}</Text>
    </View>
  )
}

export default InfoBox