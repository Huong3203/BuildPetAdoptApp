import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native'
import { db } from '../../config/FirebaseConfig'

export default function Slider() {
  const [sliderList, setSliderList] = useState([])

  useEffect(() => {
    GetSliders()
  }, [])

  const GetSliders = async () => {
    const snapshot = await getDocs(collection(db, 'Sliders')); // ✅ sửa tên đúng với Firebase
    const tempList = [];
    snapshot.forEach((doc) => {
      console.log('Slider item:', doc.data());
      tempList.push(doc.data());
    })
    setSliderList(tempList)
  }

  return (
    <View style={{
      marginTop:15
    }}>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        //keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles.sliderImage}
            />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sliderImage: {
    width:Dimensions.get('screen').width*0.9,
    height: 180,
    borderRadius:15,
    marginRight:15
  }
})
