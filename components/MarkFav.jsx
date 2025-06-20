import { useUser } from '@clerk/clerk-expo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Shared from '../Shared/Shared';


export default function MarkFav({pet, color='black'}) {

    const {user} =useUser();
    const [favList, setFavList]= useState();
    useEffect(()=>{
        user&&GetFav();

    },[user])
    const GetFav=async()=>{
       const result = await Shared.GetFavList(user)
       setFavList(result?.favorites?result?.favorites:[])
    }

    const AddToFav=async()=>{
      const favResult = favList;
      favResult.push(pet.id)
      await Shared.UpdateFav(user, favResult);
      GetFav();
    }

    const removeFromFav=async()=>{
      const favResult = favList.filter(item=>item!=pet.id);
      await Shared.UpdateFav(user, favResult);
      GetFav();
    }

  return (
    <View>

      {favList?.includes(pet.id)?
      <Pressable onPress={removeFromFav}>
        <AntDesign name="heart" size={24} color="red" />
    </Pressable>: 
     <Pressable onPress={()=>AddToFav()}>
        <Feather name="heart" size={24} color={color} />
    </Pressable>}
      

    </View>
    
  )
}