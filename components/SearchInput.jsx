import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const SearchInput = ({title,value,placeholder,handleChangeText,otherStyles,...props}) => {
 
  return (
    <View className={`${otherStyles} justify-around`}>
      <TextInput
       className='w-full border-1 p-3 bg-slate-300 rounded-lg'
       value={value}
       placeholder='search here'
       placeholderTextColor='#78239d'
       onChangeText={handleChangeText}
      />
   <TouchableOpacity>
    
   </TouchableOpacity>
    


    </View>
  )
}

export default SearchInput