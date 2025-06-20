import { useUser } from '@clerk/clerk-expo';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import PetListItem from '../../components/home/PetListItem';
import Shared from '../../Shared/Shared';
import { db } from './../../config/FirebaseConfig';

export default function Favorite() {
  const { user } = useUser();
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetFavPetIds();
    }
  }, [user]);

  // Lấy danh sách ID thú cưng yêu thích
  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);

    const favIds = result?.favorites || [];
    console.log("Danh sách ID yêu thích:", favIds);

    await GetFavPetList(favIds);
    setLoader(false);
  };

  // Lấy thông tin thú cưng từ Firestore theo ID
  const GetFavPetList = async (favIdList) => {
    const pets = [];

    for (const id of favIdList) {
      try {
        const docRef = doc(db, 'Pets', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          pets.push({ ...docSnap.data(), id }); // Gắn thêm ID vào mỗi pet
        } else {
          console.log('Không tìm thấy document:', id);
        }
      } catch (error) {
        console.log('Lỗi khi lấy pet:', id, error);
      }
    }

    setFavPetList(pets);
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-Medium', fontSize: 23 }}>
        Danh Sách Yêu Thích
      </Text>

      <FlatList
        data={favPetList}
        keyExtractor={(item) => item.id}
        numColumns={2}
        onRefresh={GetFavPetIds}
        refreshing={loader}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  );
}
