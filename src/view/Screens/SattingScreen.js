import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../consts/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/FontAwesome';
import HeaderOne3 from '../components/HeaderOne3';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../../redux/reducers/Reducers';

const SattingScreen = ({ navigation }) => {
  const [Authuser, setAuthUser] = useState();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  // console.log(user , "GetRedux");


  const OnLogOut = async () => {
    try {
      auth()
        .signOut()
        .then(() =>
          console.log('User signed out!'),
          // navigation.('SignUpScreen')
        );
      // const userData = await AsyncStorage.getItem('session');
      await AsyncStorage.removeItem('CurrentUserData')
      await AsyncStorage.removeItem('CurrentUser')
      // .then(() =>
      //     navigation.replace('SignUpScreen')
      // );
      // console.log(userData);
      // return true;
      dispatch(logout());
    }
    catch (exception) {
      return false;
    }
  }

  // const GetCurrentuser = async () => {
  //   const userData = await AsyncStorage.getItem('CurrentUserData');
  //   // console.log(userData);
  //   let Authuser = JSON.parse(userData);
  //   // console.log(Authuser);
  //   if (Authuser) {
  //     setAuthUser(Authuser);
  //     // testfectch();
  //   }
  //   else {
  //     console.log('data not found');
  //   }
  // }

  // useEffect(() => {
  //   GetCurrentuser();
  // }, [])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.main} />
      <HeaderOne3 icon="menu-open" />
      <View style={{ height: '90%', }}>

        <View style={{
          // alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 20,
          height: '75%',
        }}>
          <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.white,
            elevation: 5,
            justifyContent: 'center',
            // alignItems:'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}>
            <View style={{
              justifyContent: 'center',
              alignSelf: 'center',
              height: '30%',
              width: '40%',
              borderRadius: 70,
            }}>
              {user ? (
                <Image
                  source={{ uri: user.image }}
                  resizeMode='cover'
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 70,
                  }}
                />
              ) : (
                <Image
                  source={require('../../assets/profile.png')}
                  resizeMode='cover'
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 70,
                  }}
                />
              )}
            </View>
            <View style={{ alignItems: 'center', paddingVertical: 20, }}>
              {user ? (
                <Text style={{ color: COLORS.pink, fontSize: 20 }}>
                  {user.FirstName}
                </Text>
              ) : (
                <Text style={{ color: COLORS.pink, fontSize: 20 }}>
                  Michel Jack
                </Text>
              )}
            </View>

            <TouchableOpacity 
            onPress={() => navigation.navigate('ProfileUpdateScreen' , { userData: Authuser, })}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
              <Icon name="person" size={25} color={COLORS.black} style={{
                paddingRight: 10
              }} />
              <Text style={{ color: COLORS.black, fontSize: 18 }}>Update Profile</Text>
            </TouchableOpacity>

            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
              <Icons name="lock-reset" size={25} color={COLORS.black} style={{
                paddingRight: 10
              }} />
              <Text style={{ color: COLORS.black, fontSize: 18 }}>Change Password</Text>
            </View>

            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
              <Ionicon name="send-o" size={20} color={COLORS.black} style={{
                paddingRight: 15
              }} />
              <Text style={{ color: COLORS.black, fontSize: 18 }}>Share Profile</Text>

            </View>
          </View>
        </View>

        <View style={{
          height: '10%',
          paddingVertical: 20,
          justifyContent: 'center'
        }}>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 90,
          }}>
            <View style={{
              alignItems: 'center',
            }} >
              <Icon name="favorite-outline" size={25} color={COLORS.pink} style={{
                alignItems: 'center'
              }} />
              <Text style={{ color: COLORS.pink, fontSize: 16 }}>Favorite</Text>
            </View>

            <TouchableOpacity onPress={OnLogOut}>
              <View style={{
                alignItems: 'center',
              }}>
                <Icon name="lock-outline" size={25} color={COLORS.pink} style={{
                  alignItems: 'center'
                }} />
                <Text style={{ color: COLORS.pink, fontSize: 16 }}>Logout</Text>
              </View>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', }}>
              <Icons name="text-box-search-outline" size={25} color={COLORS.pink} style={{
                alignItems: 'center'
              }} />
              <Text style={{ color: COLORS.pink, fontSize: 16 }}>Report</Text>
            </View>
          </View>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default SattingScreen

const styles = StyleSheet.create({})