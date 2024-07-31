import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'

const TabIcon=({icon,color,name,focused})=>{
  return(
    <View className=' items-center justify-center gap-1'>
      <Image
       source={icon}
       resizeMode='contain'
       tintColor={color}
       className='w-6 h-6'
      />
      <Text className={`${focused?'font-bold':'font-pRegular'} text-xs` } style={{color:color}}>Home</Text>
    </View>
  )
}


const TabsLayout = () => {
  return (
    <>
    
      <Tabs screenOptions={
        {
          tabBarShowLabel:false,
          tabBarActiveTintColor:'#FFA001',
          tabBarInactiveTintColor:'#CDFA08',
          tabBarStyle:{
            backgroundColor:'#444',
            borderTopWidth:1,
            borderTopColor:'#000',
            height:84
          }
          }}>
       {/*tabs.screen specifies the component to be rendered when the tab is selected and sets properties such as the tab's title and icon. */}
        <Tabs.Screen
           name='home'
           options={{
            title:'Home',
            headerShown:false,
            tabBarIcon:({color,focused})=>{
              return  <TabIcon
                 icon={icons.home}
                 color={color}
                 name="Home"
                 focused={focused}
                />
            }
           }}
           />
      
      </Tabs>
    </>
  )
}

export default TabsLayout