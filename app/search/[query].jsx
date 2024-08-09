import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import useAppwrite from '../../lib/useAppwrite'
import { searchPosts } from '../../lib/appwrite'

const Search = () => {
  const {query} = useLocalSearchParams()

  const {data:posts, refetch} = useAppwrite(()=>searchPosts(query))

  useEffect(()=>{
    refetch()
  },[query])
  return (
    <SafeAreaView>
      <Text>Search</Text>
    </SafeAreaView>
  )
}

export default Search