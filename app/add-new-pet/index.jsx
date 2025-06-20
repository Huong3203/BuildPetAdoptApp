import { useUser } from '@clerk/clerk-expo';
import { Picker } from '@react-native-picker/picker';
import { Buffer } from 'buffer';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Image, Pressable, ScrollView, StyleSheet,
  Text, TextInput, ToastAndroid, TouchableOpacity, View
} from 'react-native';
import { db } from '../../config/FirebaseConfig';
import { supabase } from '../../config/supabaseClient';
import Colors from './../../constants/Colors';

export default function AddNewPet() {
  const navigation = useNavigation();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    category: 'Chó',
    sex: 'Nam'
  });

  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Thêm Thú Cưng'
    });
    GetCategories();
  }, []);

  const GetCategories = async () => {
    const snapshot = await getDocs(collection(db, 'Category'));
    const categories = [];
    snapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });

    const unique = Array.from(new Map(categories.map(item => [item.id, item])).values());
    setCategoryList(unique);
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageBase64(result.assets[0].base64);
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  };

  const UploadImage = async () => {
    if (!imageBase64) {
      ToastAndroid.show('Vui lòng chọn ảnh!', ToastAndroid.SHORT);
      return null;
    }

    try {
      const fileName = `petapp/${Date.now()}.jpg`;

      const { error } = await supabase.storage
        .from('petapp')
        .upload(fileName, Buffer.from(imageBase64, 'base64'), {
          contentType: 'image/jpeg',
        });

      if (error) {
        console.log('Upload error:', error);
        ToastAndroid.show('Upload ảnh thất bại', ToastAndroid.SHORT);
        return null;
      }

      const { publicURL, error: urlError } = supabase.storage
        .from('petapp')
        .getPublicUrl(fileName);

      if (urlError) {
        console.log('Lấy URL thất bại:', urlError);
        ToastAndroid.show('Lấy URL ảnh thất bại', ToastAndroid.SHORT);
        return null;
      }

      ToastAndroid.show('Upload ảnh thành công!', ToastAndroid.SHORT);
      return publicURL;
    } catch (error) {
      console.log('UploadImage Error:', error);
      ToastAndroid.show('Có lỗi xảy ra khi upload ảnh', ToastAndroid.SHORT);
      return null;
    }
  };

  const SaveFormData = async (imageUrl) => {
    try {
      const docId = Date.now().toString();

      await setDoc(doc(db, 'Pets', docId), {
        ...formData,
        imageUrl: imageUrl,
        username: user?.fullName || 'Ẩn danh',
        email: user?.primaryEmailAddress?.emailAddress || 'Không có email',
        userImage: user?.imageUrl || '',
        id: docId
      });

      ToastAndroid.show('Thêm thú cưng thành công!', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.log('Lỗi SaveFormData:', error);
      ToastAndroid.show('Lưu dữ liệu thất bại!', ToastAndroid.SHORT);
    }
  };

  const onSubmit = async () => {
    if (
      !formData.name ||
      !formData.category ||
      !formData.breed ||
      !formData.age ||
      !formData.sex ||
      !formData.weight ||
      !formData.address ||
      !formData.about
    ) {
      ToastAndroid.show('Nhập tất cả các chi tiết', ToastAndroid.SHORT);
      return;
    }

    if (!imageBase64) {
      ToastAndroid.show('Vui lòng chọn ảnh', ToastAndroid.SHORT);
      return;
    }

    const imageUrl = await UploadImage();

    if (!imageUrl) return;

    await SaveFormData(imageUrl);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      {/* Tên người thêm thú cưng */}
      <Text style={{
        fontFamily: 'outfit-Medium',
        fontSize: 16,
        marginBottom: 5,
        color: Colors.PRIMARY
      }}>
        Người thêm: {user?.fullName || 'Ẩn danh'}
      </Text>

      <Text style={{ fontFamily: 'outfit-Medium', fontSize: 20, marginBottom: 10 }}>Thêm Thú Cưng</Text>

      <Pressable onPress={imagePicker}>
        {!image ? (
          <Image
            source={require('./../../assets/images/add.png')}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.GRAY
            }}
          />
        ) : (
          <Image source={{ uri: image }} style={{
            width: 100,
            height: 100,
            borderRadius: 15
          }} />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên Thú Cưng *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange('name', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Danh Mục</Text>
        <Picker
          selectedValue={formData.category}
          style={styles.input}
          onValueChange={(itemValue) => {
            handleInputChange('category', itemValue);
          }}>
          {categoryList.map((Category) => (
            <Picker.Item key={`${Category.id}-${Category.name}`} label={Category.name} value={Category.name} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Giống *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange('breed', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tuổi *</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric-pad'
          onChangeText={(value) => handleInputChange('age', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Giới Tính *</Text>
        <Picker
          selectedValue={formData.sex}
          style={styles.input}
          onValueChange={(itemValue) => {
            handleInputChange('sex', itemValue);
          }}>
          <Picker.Item label="Đực" value="Nam" />
          <Picker.Item label="Cái" value="Nữ" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cân Nặng *</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric-pad'
          onChangeText={(value) => handleInputChange('weight', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Địa Chỉ: *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange('address', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Thông Tin *</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange('about', value)}
        />
      </View>

      <TouchableOpacity style={styles.botton} onPress={onSubmit}>
        <Text style={{ fontFamily: 'outfit-Medium', textAlign: 'center' }}>Thêm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7
  },
  label: {
    marginVertical: 5,
    fontFamily: 'outfit-Regular'
  },
  botton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 50
  }
});
