import { Feather } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useUser } from '@clerk/clerk-expo'; // ✅ Đã thêm useUser
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import { db } from '../../config/FirebaseConfig';
import Colors from '../../constants/Colors';

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUser(); // ✅ Lấy thông tin user

  const handleEdit = () => {
    navigation.navigate('EditPet', { ...pet });
  };

  const handleDelete = () => {
    Alert.alert('Xóa thú cưng', 'Bạn có chắc chắn muốn xóa thú cưng này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          try {
            if (pet.id) {
              await deleteDoc(doc(db, 'Pets', pet.id));
              navigation.goBack();
            } else {
              console.warn('Không có ID thú cưng để xóa.');
            }
          } catch (error) {
            console.error('Lỗi khi xóa:', error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableOpacity onPress={handleDelete}>
            <MaterialCommunityIcons
              name="delete-empty"
              size={26}
              color="black"
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit}>
            <Feather name="edit" size={23} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const InitiateChat = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const petEmail = pet?.email;

    if (!userEmail || !petEmail) {
      Alert.alert('Lỗi', 'Không đủ thông tin để bắt đầu cuộc trò chuyện');
      return;
    }

    const docId1 = userEmail + '_' + petEmail;
    const docId2 = petEmail + '_' + userEmail;

    const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPet pet={pet} />
        <OwnerInfo pet={pet} />
        <View style={{ height: 70 }} />
      </ScrollView>

      {/* Adopt me button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={InitiateChat} style={styles.adoptBtn}>
          <Text style={styles.adoptText}>Nhận Nuôi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adoptBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
  },
  bottomContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  adoptText: {
    textAlign: 'center',
    fontFamily: 'outfit-Medium',
    fontSize: 20,
  },
});
