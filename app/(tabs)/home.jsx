import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/home/Header';
import PetListByCategory from '../../components/home/PetListByCategory';
import Slider from '../../components/home/Slider';
import Colors from '../../constants/Colors';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false); // trạng thái loading

  return (
    <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 20 }}>

      {/* Header cố định */}
      <Header />

      {/* Loader hiển thị khi tải dữ liệu */}
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={{ marginVertical: 10 }}
        />
      )}

      {/* Nội dung cuộn được */}
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      >
        <Slider />

        {/* Truyền hàm thay đổi trạng thái loading xuống */}
        <PetListByCategory onLoadingChange={setIsLoading} />

        {/* 
          Ẩn nút Thêm Thú Cưng
          <Link href={'/add-new-pet'} style={styles.addNewPetContainer}>
            <FontAwesome6 name="add" size={24} color={Colors.PRIMARY} />
            <Text style={{
              fontFamily: 'outfix-Medium',
              color: Colors.PRIMARY,
              fontSize: 18
            }}>Thêm Thú Cưng</Text>
          </Link> 
        */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    borderStyle: 'dashed',
    justifyContent: 'center'
  }
});
