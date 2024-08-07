import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { Link, Redirect, router } from 'expo-router'
import { icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../context/GlobalProvider'

const index = () => {

  const {isLoading, isLoggedIn} = useGlobalContext()

  // if(!isLoading && isLoggedIn) return <Redirect href='/home'/>
  return (
    <SafeAreaView className='bg-gray-600 h-full'>
        <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className='flex-1 justify-center items-center min-h-[85vh]'>
          <Text className='text-5xl font-pRegular'>AORA</Text>
          <Link href="/home" className='font-roboto'>go to Home</Link>
          <Image source={icons.home}/>
          <Image source={{uri:icons.home}}/>
          <CustomButton
          title='COntinue with email'
          handlePress={()=>router.push('/sign-up')}
          containerStyles='w-full mt-7'
          TextStyles=''
          isLoading={isLoading}
          />
        </View>

        </ScrollView>

        <StatusBar //top bar logo of wifi battery notifications
         backgroundColor='#161122'
         style='light'
         />
    </SafeAreaView>
  )
}

export default index