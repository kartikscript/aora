import { View, Text, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { createUser } from '../../lib/appwrite'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const SignUp = () => {
  const [form,setForm]=useState({
    email:'',
    password:'',
    username:''
  })
 const [isSubmitting, setIsSubmitting] = useState(false)
 const {setIsLoggedIn, setUser} =useGlobalContext()

 const submit=async ()=>{
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error','Fill all the details')
    }
    setIsSubmitting(true)

    try {
      const results = await createUser(form.email,form.password,form.username)
      setUser(results)
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
          <Text>Sign up here</Text>
          <FormField
            title="email"
            value={form.email}
            handleChangeText={(e)=>setForm({...form,email:e})}
            otherStyles='mt-6'
          />
          <FormField
            title="password"
            value={form.password}
            handleChangeText={(e)=>setForm({...form,password:e})}
            otherStyles='mt-6'
          />
          <FormField
            title="username"
            value={form.username}
            handleChangeText={(e)=>setForm({...form,username:e})}
            otherStyles='mt-6'
          />
          <CustomButton
            title='Sign Up'
            handlePress={submit}
            isLoading={isSubmitting}
          />
      </View>
    </ScrollView>

  </SafeAreaView>
  )
}

export default SignUp

