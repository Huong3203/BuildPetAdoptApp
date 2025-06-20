import { useUser } from '@clerk/clerk-expo';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Buffer } from 'buffer';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View,
} from 'react-native';

import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { supabase } from '../../config/supabaseClient';
import Colors from '../../constants/Colors';

const EditPet = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petId } = route.params;
  const { user } = useUser();

  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: 'Sửa Thông Tin Thú Cưng' });
    fetchPetData();
    fetchCategories();
  }, []);

  const fetchPetData = async () => {
    const petRef = doc(db, 'Pets', petId);
    const docSnap = await getDoc(petRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setFormData(data);
      setImage(data.image);
    } else {
      ToastAndroid.show('Không tìm thấy thú cưng', ToastAndroid.SHORT);
    }
  };

  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, 'Category'));
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const uniqueCategories = Array.from(new Map(categories.map(c => [c.id, c])).values());
    setCategoryList(uniqueCategories);
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
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

  const uploadNewImage = async () => {
    const fileName = `petapp/${Date.now()}.jpg`;
    const { error } = await supabase.storage
      .from('petapp')
      .upload(fileName, Buffer.from(imageBase64, 'base64'), {
        contentType: 'image/jpeg',
      });

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { publicURL, error: urlError } = supabase.storage
      .from('petapp')
      .getPublicUrl(fileName);

    if (urlError) {
      console.error('URL error:', urlError);
      return null;
    }

    return publicURL;
  };

  const handleUpdate = async () => {
    let imageUrl = formData.image;
    if (imageBase64) {
      const newUrl = await uploadNewImage();
      if (newUrl) imageUrl = newUrl;
    }

    const petRef = doc(db, 'Pets', petId);
    await updateDoc(petRef, {
      ...formData,
      image: imageUrl,
      updatedAt: new Date().toISOString()
    });

    ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={styles.label}>Tên thú cưng</Text>
      <TextInput
        value={formData.name}
        onChangeText={text => handleInputChange('name', text)}
        style={styles.input}
      />

      <Text style={styles.label}>Tuổi</Text>
      <TextInput
        value={formData.age}
        onChangeText={text => handleInputChange('age', text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Giới tính</Text>
      <Picker
        selectedValue={formData.sex}
        onValueChange={value => handleInputChange('sex', value)}
        style={styles.input}
      >
        <Picker.Item label="Nam" value="Nam" />
        <Picker.Item label="Nữ" value="Nữ" />
      </Picker>

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        value={formData.description}
        onChangeText={text => handleInputChange('description', text)}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <Text style={styles.label}>Danh mục</Text>
      <Picker
        selectedValue={formData.category}
        onValueChange={value => handleInputChange('category', value)}
        style={styles.input}
      >
        {categoryList.map(item => (
          <Picker.Item key={item.id} label={item.name} value={item.name} />
        ))}
      </Picker>

      <Text style={styles.label}>Ảnh</Text>
      <Pressable onPress={imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={[styles.image, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
            <Text>Chọn ảnh</Text>
          </View>
        )}
      </Pressable>

      <Pressable style={styles.button} onPress={handleUpdate}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cập nhật</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  image: {
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default EditPet;
