import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import MarkFav from '../MarkFav';

export default function PetListItem({pet}) {

  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={()=>router.push({
        pathname:'/pet-details',
        params:pet
      })}
    style={{
        padding:10,
        marginRight:15,
        backgroundColor:Colors.WHITE,
        borderRadius:10
    }}>
      <View style={{
        position:'absolute',
        zIndex:10,
        right:10,
        top:10
      }}>
        <MarkFav pet={pet} color={'white'} />

      </View>
      <Image source={{uri:pet?.imageUrl}}
      style={{
        width:185,
        height:140,
        objectFit:'cover',
        borderRadius:10
      }}/>

      <Text style={{
        fontFamily: 'outfit-Medium', 
        fontSize:17
      }}>{pet?.name}</Text>

      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
          <Text style={{
            color:Colors.GRAY,
            fontFamily:'outfit-Medium'
          }}>{pet?.breed}</Text>

          <Text style={{
            color:Colors.PRIMARY,
            fontFamily:'outfit-Medium',
            paddingHorizontal:7,
            borderRadius:7,
            fontSize:11,
            backgroundColor:Colors.LIGHT_PRIMARY
          }}>{pet.age}Năm</Text>
      </View>
      
    </TouchableOpacity>
  )
}