import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const FormField = ({title,value,placeholder,handleChangeText,otherStyles,...props}) => {
 const [showPassword, setShowPassword] = useState(false)
 
  return (
    <View className={`${otherStyles} justify-around`}>
      <Text>{title}</Text>
      <TextInput
       className=''
       value={value}
       placeholder={placeholder}
       placeholderTextColor='#78239d'
       onChangeText={handleChangeText}
       secureTextEntry={title==='password' && !showPassword}
      />
    {title==='password' && (
      <TouchableOpacity  className='text-white font-medium text-lg' onPress={()=>setShowPassword(!showPassword)}>
         <Text>{!showPassword ?'hide password':'show password'}</Text>
      </TouchableOpacity>
    )}
    


    </View>
  )
}

export default FormField