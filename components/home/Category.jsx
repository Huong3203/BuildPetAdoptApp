import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from './../../config/FirebaseConfig';
import Colors from './../../constants/Colors';


export default function Category({category}) {

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedategory]= useState('Chó');

  useEffect(() => {
    GetCategories();
  }, [])

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, 'Category'));
    snapshot.forEach((doc) => {
      setCategoryList(prev => [...prev, { id: doc.id, ...doc.data() }]);
    })
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-Medium', fontSize: 20 }}>Danh Mục</Text>

      <FlatList
        data={categoryList}
        numColumns={4}
        //keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={()=> {
              setSelectedategory(item.name);
              category(item.name)
            }} 
          style={{
            flex:1
          }}>
            <View style={[styles.container,
              selectedCategory==item.name&&styles.selectedCategoryContainer
            ]}>

              <Image
              source={{ uri: item?.imageUrl }}
              style={{ 
                width: 40, 
                height: 40}}
            />
            </View>
            
            <Text style={{
              textAlign:'center',
              fontFamily:'outfit-Regular'
            }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_PRIMARY,// màu ô
    padding:15,
    alignItems:'center',
    borderRadius:15,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    margin:5
  },
  selectedCategoryContainer:{
    backgroundColor: Colors.SECONDARY,
    borderColor:Colors.SECONDARY
  }
})

