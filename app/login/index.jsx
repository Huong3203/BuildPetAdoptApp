import { useAuth, useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Colors from './../../constants/Colors';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { setActive } = useAuth(); // ✅ Lấy setActive từ useAuth

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        await setActive({ session: createdSessionId }); // ✅ Thiết lập phiên đăng nhập
      } else {
        console.log('Không tạo được phiên đăng nhập. Có thể cần xác thực bổ sung.');
      }
    } catch (err) {
      console.error('Lỗi OAuth', err);
    }
  }, [startOAuthFlow, setActive]);

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
      <Image
        source={require('./../../assets/images/anhnen.jpg')}
        style={{ width: '100%', height: 500 }}
      />
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 30,
            textAlign: 'center',
          }}
        >
          Sẵn sàng để kết bạn mới?
        </Text>

        <Text
          style={{
            fontFamily: 'outfit-Regular',
            fontSize: 18,
            textAlign: 'center',
            color: Colors.GRAY,
          }}
        >
          Hãy nhận nuôi thú cưng bạn yêu thích và giúp chúng có cuộc sống hạnh phúc trở lại.
        </Text>

        <Pressable
          onPress={onPress}
          style={{
            padding: 14,
            marginTop: 100,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 14,
            width: '100%',
          }}
        >
          <Text
            style={{
              fontFamily: 'outfit-Medium',
              fontSize: 20,
              textAlign: 'center',
              color: Colors.WHITE,
            }}
          >
            Đăng nhập với Google
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
