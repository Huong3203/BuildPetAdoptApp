import { View } from 'react-native';
import PetSubInfoCard from '../../components/PetDetails/PetSubInfoCard';

export default function PetSubInfo({pet}) {
  return (
    <View style={{
        paddingHorizontal:20
    }}>

        <View style={{
            display:'flex',
            flexDirection:'row'
        }}>
            <PetSubInfoCard 
            icon={require('./../../assets/images/calendar.png')}
            title={'Tuổi'}
            value={pet?.age + " Năm"}/>

            <PetSubInfoCard icon={require('./../../assets/images/bone.png')}
            title={'Giống'}
            value={pet?.breed}/>
        </View>

        <View style={{
            display:'flex',
            flexDirection:'row'
        }}>
            <PetSubInfoCard 
            icon={require('./../../assets/images/sex.png')}
            title={'Giới tính'}
            value={pet?.sex}/>

            <PetSubInfoCard icon={require('./../../assets/images/weight.png')}
            title={'Cân Nặng'}
            value={pet?.weight + " kg"}/>
        </View>

    </View>
  )
}