import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,  // Màu vàng khi được chọn
        tabBarInactiveTintColor: 'black',       // Màu đen khi chưa chọn
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} /> // ← dùng color
          ),
        }}
      />
      <Tabs.Screen 
        name="favorite" 
        options={{
          title: 'Favorite',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite" size={24} color={color} /> // ← dùng color
          ),
        }}
      />
      <Tabs.Screen 
        name="inbox"
        options={{
          title: 'Inbox',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox" size={24} color={color} /> // ← dùng color
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={24} color={color} /> // ← dùng color
          ),
        }}
      />
    </Tabs>
  );
}
