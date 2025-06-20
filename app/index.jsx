import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { View } from "react-native";
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';


export default function Index() {

  const {user} = useUser();

  return (
    <View
      style={{
        flex: 1,
        
      }}
    >
      {user?
      <Redirect href={'/(tabs)/home'}/>
      :<Redirect href={'/(tabs)/home'}/>//test
     //:<Redirect href={'/login'}/> //chính

    }


    </View>
  );
}
