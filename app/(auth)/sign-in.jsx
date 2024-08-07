import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'

const SignIn = () => {
  const [form,setForm]=useState({
    email:'',
    password:'',
  })
 const [isSubmitting, setIsSubmitting] = useState(false)

 const {setIsLoggedIn, setUser} =useGlobalContext()
 const submit=async ()=>{
  if( !form.email || !form.password){
    Alert.alert('Error','Fill all the details')
  }
  setIsSubmitting(true)

  try {
    await signIn(form.email,form.password)
    const result = await getCurrentUser();
    setUser(result)
    setIsLoggedIn(true)
    router.replace('/home')
  } catch (error) {
    Alert.alert('Error',error.message)
  } finally{
    setIsSubmitting(false)
  }
}
  return (
    <SafeAreaView className='bg-slate-600 h-full'>
      <ScrollView>
        <View className='min-h-[85vh] w-full justify-center my-6 px-4 '>
          {/* to center the view we use min-h-85vh not items-center */}
            <Text>Log in here</Text>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e)=>setForm({...form,email:e})}
              otherStyles='mt-6'
              keyboardType='email-address'
            />
            <FormField
              title="password"
              value={form.password}
              handleChangeText={(e)=>setForm({...form,password:e})}
              otherStyles='mt-6'
            />
          
            <CustomButton
              title='Sign In'
              handlePress={submit}
              isLoading={isSubmitting}
            />
        </View>
      </ScrollView>

    </SafeAreaView>
      
  )
}

export default SignIn