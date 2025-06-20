import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { db } from '../../config/FirebaseConfig';
import Category from './Category';
import PetListItem from './PetListItem';

export default function PetListByCategory({ onLoadingChange }) {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetPetList('Chó');
  }, []);

  /**
   * Lấy danh sách thú cưng theo loại
   * @param {*} Category 
   */
  const GetPetList = async (Category) => {
    try {
      setLoader(true);
      onLoadingChange && onLoadingChange(true); // Báo đang loading

      setPetList([]); // reset danh sách

      const q = query(collection(db, 'Pets'), where('category', '==', Category));
      const querySnapshot = await getDocs(q);

      const pets = [];
      querySnapshot.forEach((doc) => {
        const petData = doc.data();
        petData.id = doc.id; // gán ID làm key duy nhất
        pets.push(petData);
      });

      setPetList(pets);
      console.log('pet', pets);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu thú cưng:', error);
    } finally {
      setLoader(false);
      onLoadingChange && onLoadingChange(false); // Báo đã xong
    }
  };

  return (
    <View>
      <Category category={(value) => GetPetList(value)} />

      <FlatList
        data={petList}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        style={{ marginTop: 10 }}
        numColumns={2} // Hiển thị 2 thú cưng trên 1 hàng
        refreshing={loader}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
        onRefresh={() => GetPetList('Chó')}
        renderItem={({ item }) => (
          <PetListItem key={item.id} pet={item} />
        )}
      />
    </View>
  );
}
