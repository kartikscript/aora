import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { ResizeMode, Video } from 'expo-av'
import CustomButton from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const Create = () => {
  const {user} = useGlobalContext()
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title:'',
    video:null,
    thumbnail:null,
    prompt:''
  })

  const openPicker =async (selectType)=>{
    const result = await DocumentPicker.getDocumentAsync({
      type:selectType==='image'
      ?['image/png','image/jpg']
      :['video/mp4', 'video/gif']
    })

    if(!result.canceled){
      if(selectType==='image'){
        setForm({...form,thumbnail:result.assets[0]})
      }
      if(selectType==='video'){
        setForm({...form,video:result.assets[0]})
      }
    }
  }
  const submit =async ()=>{
    if(!form.prompt || !form.thumbnail || !form.title || !form.video){
      return Alert.alert('please fill all fields')
    }
    setUploading(true)

    try {
      await createVideo({
        ...form,userId:user.$id
      })
      Alert.alert('succcess','post upload')
      router.push('/home')
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally{
      setForm({
        title:'',
        video:null,
        thumbnail:null,
        prompt:''
      })
      setUploading(false)
    }
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>upload your vidro</Text>
        <FormField
         title='video title'
         value={form.title}
         placeholder='give your video a title'
         handleChangeText={e=>setForm({...form,title:e})}
         otherStyles='mt-10'
        />

        <Text>upload video</Text>
        <TouchableOpacity onPress={()=>openPicker('video')}>
          {form.video ? (
            <Video
             source={{uri:form.video.uri}}
             className=''
             resizeMode={ResizeMode.COVER}
             
            />
          ):(
            <View >
              <Text>choose a file to upload vid</Text>
            </View>
          )}
        </TouchableOpacity>


        <View>
          <Text>upload thumbnail image</Text>
          <TouchableOpacity onPress={()=>openPicker('image')}>
          {form.thumbnail ? (
            <Image
             source={{uri:form.thumbnail.uri}}
             className=''
             resizeMode='cover'
            
            />
          ):(
            <View >
              <Text>choose a file to upload thumbnail</Text>
            </View>
          )}
        </TouchableOpacity>
        </View>

        <FormField
         title='AI Prompt'
         value={form.prompt}
         placeholder='give your video a prompt'
         handleChangeText={e=>setForm({...form,prompt:e})}
         otherStyles='mt-10'
        />

        <CustomButton
         title='submit and publish'
         handlePress={submit}
         containerStyles='mt-7'
         isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create