import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts, searchPosts, signOut } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import InfoBox from '../../components/InfoBox'

const Profile = () => {
const {user,setUser,setIsLoggedIn} = useGlobalContext()
  const {data:posts} = useAppwrite(()=>getUserPosts(user.$id))


  const logout =async ()=>{
    await signOut();
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/sign-in') //not used 'push' bcoz after back the page we would have seen profile 
  }
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={logout}>
        log out
      </TouchableOpacity>
      <Image source={{uri:user?.avatar}}/>
      <InfoBox
       title={user?.username}
       containerStyles='mt-5'
       titleStyles= 'text-lg'
      />
      <InfoBox
       title={posts.length || 0}
       subtitle='posts'
       containerStyles='mt-5'
       titleStyles= 'text-lg'
      />
      <InfoBox
       title='1.2k'
       subtitle='followers'
       titleStyles= 'text-lg'
      />
    </SafeAreaView>
  )
}

export default Profile