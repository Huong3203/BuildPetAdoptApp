import { Image, Text, View } from 'react-native';
import MarkFav from '../MarkFav';

export default function PetInfo({pet}) {
  return (
    <View>
      <Image source={{uri:pet.imageUrl}}
      style={{
        width:'100%',
        height:400,
        objectFit:'cover'
      }}
      />

      <View style={{
        padding:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
        
        <View>
            <Text style={{
                fontFamily:'outfit',
                fontSize:24
            }}>{pet?.name}</Text>

            
           
        </View>
        <MarkFav pet={pet}/>
      </View>
    </View>
  )
}