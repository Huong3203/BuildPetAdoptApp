import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function OwnerInfo({ pet }) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: pet?.userImage }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.userName}>
            {pet?.userName}
          </Text>

          <Text style={styles.userRole}>
            Chủ Vật Nuôi
          </Text>

          {pet?.email && (
            <Text style={styles.userEmail}>
              {pet.email}
            </Text>
          )}
        </View>
      </View>
      <FontAwesome name="send" size={24} color={Colors.PRIMARY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 99,
  },
  userName: {
    fontFamily: 'outfit-Medium',
    fontSize: 18,
  },
  userRole: {
    fontFamily: 'outfit-Regular',
    color: Colors.GRAY,
  },
  userEmail: {
    fontFamily: 'outfit-Regular',
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
});
