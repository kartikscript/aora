import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, usePathname } from 'expo-router'

const SearchInput = ({}) => {
 
  const pathname= usePathname()
  const [query, setQuery] = useState('')
  return (
    <View className={`${otherStyles} justify-around`}>
      <TextInput
       className='w-full border-1 p-3 bg-slate-300 rounded-lg'
       value={query}
       placeholder='search here'
       placeholderTextColor='#78239d'
       onChangeText={(e)=>setQuery(e)}
      />
   <TouchableOpacity
    onPress={()=>{
      if(!query){
        return Alert.alert('missing queery', 'please fill')
      }
      if(pathname.startsWith("/search")) router.setParams({query})
      else router.push(`/search/${query}`)
    }}
   >
        search
   </TouchableOpacity>
    


    </View>
  )
}

export default SearchInput