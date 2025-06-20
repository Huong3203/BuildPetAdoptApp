import { ClerkProvider } from '@clerk/clerk-expo';
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SecureStore from 'expo-secure-store';


const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐\n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },

  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return null
    }
  }
}


export default function RootLayout() {

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Bold.ttf'),
    'outfit-Medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-Regular':require('./../assets/fonts/Outfit-Regular.ttf'),

  })

  return (
    <ClerkProvider 
    tokenCache={tokenCache}
    publishableKey={publishableKey}>

    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)"
      //ẩn thanh tiêu đề 
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen name="login/index" 
      //ẩn thanh tiêu đề 
      options={{
        headerShown:false
      }}
      />
      

    </Stack>

    </ClerkProvider>
    
  );
}
