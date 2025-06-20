import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function AboutPet({pet}) {
    const [readMore, setReadMore] = useState(true);
  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'font-Medium',
        fontSize:20
      }}>Về {pet?.name}</Text>

      <Text numberOfLines={readMore?3:20}
      style={{
        fontFamily:'font-Regular',
        fontSize:14
      }}>{pet?.about}</Text>

       {readMore && 
        <Pressable onPress={()=>setReadMore(false)}>
            <Text style={{
            fontFamily:'outfit-Medium',
            fontSize:14,
            color:Colors.SECONDARY
        }}>Đọc Thêm</Text> 
       </Pressable>}
       

      
    </View>
  )
}