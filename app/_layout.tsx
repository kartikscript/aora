import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, SplashScreen, Stack } from 'expo-router'
import {useFonts} from 'expo-font'


SplashScreen.preventAutoHideAsync()
// is used to prevent the splash screen from automatically hiding when your Expo app is done loading.
//  This allows you to control precisely when the splash screen should be hidden,
//  ensuring that your app's main content is fully loaded and ready before the splash screen disappears.



const RootLayout = () => {

  const [fontsLoaded, error] =useFonts({
    'Roboto-Black':require('../assets/fonts/Roboto-Black.ttf'),
    'Poppins-Black':require('../assets/fonts/Poppins-Regular.ttf')
  })

  useEffect(()=>{
    // splash screen typically includes the app's logo, name, or other branding elements, and serves to provide a visual cue to users that the app is loading.
    //SplashScreen.hideAsync() used to hide the splash screen in an Expo application. The splash screen is displayed while the app is loading and initializing.
    // You typically call SplashScreen.hideAsync once your app has finished loading and is ready to be displayed to the user.
    if(error) throw error
    if(fontsLoaded) SplashScreen.hideAsync()

  },[fontsLoaded,error])

  if(!fontsLoaded && !error) return null
  return (
    // <Slot/>//this renders index.tsx as home file OR we can use stack

    <Stack>
      <Stack.Screen name='index' options={{headerShown:false}}/>
    </Stack>
  )
}

export default RootLayout