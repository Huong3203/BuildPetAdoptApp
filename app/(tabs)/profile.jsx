import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Colors from './../../constants/Colors';

export default function Profile() {

  const Menu = [
    {
      id: 1,
      name: 'Thêm Thú Cưng',
      icon: 'add-circle',
      path: '/add-new-pet',
    },
    {
      id: 2,
      name: 'Danh Sách Yêu Thích',
      icon: 'heart',
      path: '/(tabs)/favorite',
    },
    {
      id: 3, 
      name: 'Inbox',
      icon: 'chatbubble',
      path: '/(tabs)/inbox',
    },
      {
      id: 4,
      name: 'Đăng Xuất',
      icon: 'exit',
      path: 'logout', // Đổi từ '/login' thành 'logout'
    },
  ];

  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const onPressMenu = async (menu) => {
  if (menu.path === 'logout') {
    await signOut();       // Đăng xuất
    router.replace('/login');  // Chuyển về login, dùng replace để không cho quay lại profile
    return;
  }
  router.push(menu.path);
};

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-Medium', fontSize: 30 }}>Thông Tin</Text>

      <View 
      style={{ 
        alignItems: 'center', 
        marginVertical: 25 }}>
        <Image source={{ uri: user?.imageUrl }}
          style={{ width: 80, height: 80, borderRadius: 99 }} />
        <Text style={{ fontFamily: 'outfit', fontSize: 20, marginTop: 6 }}>{user?.fullName}</Text>
        <Text style={{
          fontFamily: 'outfit-Regular',
          fontSize: 16,
          color: Colors.GRAY
        }}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      <FlatList
        data={Menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              backgroundColor: Colors.WHITE,
              padding: 10,
              borderRadius: 10
            }}>
            <Ionicons name={item?.icon} size={30}
              color={Colors.PRIMARY}
              style={{
                padding: 10,
                backgroundColor: Colors.LIGHT_PRIMARY,
                borderRadius: 8
              }} />
            <Text style={{
              fontFamily: 'outfit-Regular',
              fontSize: 20
            }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
