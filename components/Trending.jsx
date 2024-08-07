import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'


const zoomIn= {
  0:{
    scale:0.9
  },
  1:{
    scale:1
  }
}
const zoomOut= {
  0:{
    scale:1
  },
  1:{
    scale:0.9
  }
}

const TrendingItem = ({activeItem, item}) =>{
  const {play, setPlay}= useState(false)
    return (
      <Animatable.View
        className='mr-5'
        animation={activeItem=== item.$id ? zoomIn:zoomOut}
        duration={500}
      >

      </Animatable.View>
    )
}
//we use faltlist to support hori and vertical scroll at same time as ScrollView doesnt support both at same time
const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[0])
  
  const viewableItemsChanged = ({viewableItem}) =>{
      if(viewableItem.length>0){
        setActiveItem(viewableItem[0].key)
      }
  }
  return (
    <View>
      <FlatList 
       data={posts}
       keyExtractor={(item)=>item.$id}
       renderItem={({item})=>{
        return (
          <TrendingItem activeItem={activeItem} item/>
        )
       }}
       onViewableItemsChanged={viewableItemsChanged}
       viewabilityConfig={{
        itemVisiblePercentThreshold:70
       }}
       contentOffset={{x:170}}
       horizontal
      />

    </View>
  )
}

export default Trending