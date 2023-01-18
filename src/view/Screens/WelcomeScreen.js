import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderOne from '../components/HeaderOne';
import COLORS from '../../consts/Colors';
import CustomeButton from '../components/CustomeButton';
import firestore from '@react-native-firebase/firestore';
import FirebaseSetup from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login, status } from '../../../redux/reducers/Reducers';


const WelcomeScreen = ({ navigation }) => {
  const { auth, firebase } = FirebaseSetup();
  const [userExist, setUserExit] = useState()
  const [userData, setUserData] = useState('')
  const dispatch = useDispatch();
  const [Lock2, setLock] = useState(false);

  // const AddToRedux = userData => {
  //   dispatch(addItemToCart(userData))
  //   // dispatch(RemoveItemFromCart(userData))
  // };



  const OnUserInfoScreen = () => {
      navigation.navigate('UserInfoScreen')
  }

  const GetCurrentUser = async () => {
    const userData = await AsyncStorage.getItem('session');

    firestore().collection('users')
      .doc(userData)
      .get()
      .then(documentSnapshot => {
        // console.log('User exists: ', documentSnapshot.exists);
        if (documentSnapshot.exists) {
          console.log('userExist if', userExist);
          const data = documentSnapshot.data().userDetails
          // console.log('User data: ', documentSnapshot.data());
          // const userData = JSON.stringify(documentSnapshot.data().userDetails)
          // console.log(userData);
          setUserData(data)
        }
        else {
          setUserData('')
          console.log('userExist else',userExist);
        }
      });
  }

  useEffect(() => {
    GetCurrentUser();
  }, [])

  useEffect(() => {
    const userData2 = JSON.stringify(userData)
    AsyncStorage.setItem('CurrentUserData', userData2);


  }, [userData , userExist])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.main} />
      <HeaderOne />
      <View style={{ height: '70%', }}>
        <View style={{
          paddingHorizontal: 20,
          alignItems: 'center',
        }}>
          <View style={{ height: '45%', marginTop: -50 }}>
            <Image source={require('../../assets/welcome.png')} resizeMode="contain"
              style={{
                width: 300,
                height: 200,
              }}
            />
          </View>
        </View>


        <View style={{
          paddingHorizontal: 20,
        }}>
          <View style={{ paddingVertical: 4, }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              width: '70%',
              color: COLORS.black,
            }}>Salaam and Wellcome to Zaytoona!</Text>
          </View>
          <View>
            <Text style={{
              color: COLORS.gray,
              width: '90%',
              fontSize: 15,
            }}>Inshaallah, we'll show you some wonderful Muslims nearby after you tell
              us about your self.</Text>
          </View>
        </View>

        <View style={{ paddingVertical: 40 }}>
          <CustomeButton title={'Create Your Profile'} onPress={() => OnUserInfoScreen()} />
        </View>


      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})