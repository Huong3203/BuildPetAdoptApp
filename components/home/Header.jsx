import { useUser } from '@clerk/clerk-expo';
import { Image, Text, View } from 'react-native';

export default function Header() {

  const { user } = useUser();
  console.log('User in Header:', user);
  return (
    <View style={{
      display:'flex',
      flexDirection:'row', // ảnh bên phải
      justifyContent:'space-between', // ảnh góc trái
      alignContent:'center'
    }}>
        <View>
          <Text style={{
            fontFamily:'outfit-Regular',
            fontSize:18
          }}>Xin Chào, </Text>

          <Text style={{
            fontFamily:'outfit-Medium',
            fontSize:25
          }}>{user?.fullName} </Text>
        </View>
        <Image source={{uri:user?.imageUrl}} 
          style={{
            width:40,
            height:40,
            borderRadius:20
          }}/>


    </View>
  )
}