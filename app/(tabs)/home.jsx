import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import useAppwrite from '../../lib/useAppwrite'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'

const Home = () => {
  const [refreshing,setRefreshing]= useState(false)

  const {data:posts, refetch,} =useAppwrite(getAllPosts)
  const {data:latestPosts} = useAppwrite(getLatestPosts)
  const onRefresh= async () =>{
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }
  return (
    <SafeAreaView className='bg-slate-400 h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item)=>item.$id}
        renderItem={({item})=>{
            // <VideoCArd videos={item}/>
            return
        }}
        ListHeaderComponent={()=>{
          <View>
           <Text>welcome back</Text>
           <Text>hello</Text>
           <SearchInput/>
           <Trending posts={latestPosts}/>
          </View>
        }}
        ListEmptyComponent={()=>(
          <Text className='text-lg text-white'>data is empty</Text>
  )}
        refreshControl={<RefreshControl 
              refreshing={refreshing}
              onRefresh={onRefresh}
                />}
      />
    </SafeAreaView>
  )
}

export default Home