import { Alert, SafeAreaView, StatusBar, StyleSheet, ToastAndroid, Text, TouchableOpacity, View, LogBox } from 'react-native'
import React, { useState, useRef } from 'react'
import HeaderOne from '../components/HeaderOne'
import COLORS from '../../consts/Colors'
import { TextInput } from 'react-native-gesture-handler'
import CustomeButton from '../components/CustomeButton'
import SignUpScreen from './SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseSetup from '../../../config';


const CodeVerificationScreen = ({ navigation, route }) => {

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false)
  const { auth } = FirebaseSetup();
  const { confirmation, phoneNum } = route.params;
  // console.log('confirm key: ', confirmation);


  // const OnSignInScreen = () => {
  //   // navigation.replace('SigninScreen')
  //   console.log('test: ', verificationid)
  // }
  // +923470066234
  // const ConfirmCode = async () => {
  //   try {
  //     await confirm.confirm(code);
  //     alert('User Sign In Successfully')
  //   } catch (err) {
  //     alert(JSON.stringify(err))
  //   }
  // }

  const onConfirmPressed = async () => {
    try {
      const response = await confirmation.confirm(code)
        .then((data) => {
          // console.log('authuserdata: ', data);
          AsyncStorage.setItem('session', data.user.uid);
          AsyncStorage.setItem('AuthPhone', data.user.phoneNumber);
          // AsyncStorage.setItem('CurrentUser', data.user);
        });
      ToastAndroid.show('User Sign In Successfully', ToastAndroid.SHORT)
      navigation.navigate('WelcomeScreen')
      // await confirm.confirm(code).then((data) =>{
      //   console.log(data.user.uid);

      //   AsyncStorage.setItem('session', data.user.uid);
      // })
      // ToastAndroid.show('User Sign In Successfully', ToastAndroid.SHORT)
      // setCode('')
      // navigation.replace('WelcomeScreen')
    } catch (error) {
      console.log('Invalid code.' + error);
      // ToastAndroid.show('Invalid code.', ToastAndroid.SHORT);
    }
  }

  const getCodeHandler = () => {
    if (code == '') {
      setCodeError(true);
      if (code == '') {
        ToastAndroid.show("Code cannot be empty", ToastAndroid.SHORT);
        return false;
      }
      return false;
    }
    else {
      setCode('')
      onConfirmPressed();
    }
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.main} />
      <HeaderOne />
      <View style={{ height: '70%', }}>
        <View style={{
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}>
          <View style={{ paddingVertical: 4, }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
            }}>Enter Code</Text>
          </View>
          <View>
            <Text style={{
              color: COLORS.gray,
              width: '70%',
              fontSize: 15,
            }}>Enter the four digit code we sent to {phoneNum}</Text>
          </View>
        </View>

        <View style={styles.digitbtn}>
          <View style={{
            height: 70,
            width: '100%',
            borderWidth: 1,
            borderColor: COLORS.pink,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <TextInput placeholder='******' style={{
              color: COLORS.black,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
              keyboardType='phone-pad'
              value={code}
              onChangeText={code => setCode(code)
              }
            />
          </View>
          {/* <View style={{
            height: 70,
            width: 50,
            borderWidth: 1,
            borderColor: COLORS.pink,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <TextInput placeholder='3' style={{
              color: COLORS.black,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }} />
          </View>
          <View style={{
            height: 70,
            width: 50,
            borderWidth: 1,
            borderColor: COLORS.pink,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <TextInput placeholder='4' style={{
              color: COLORS.black,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }} />
          </View>
          <View style={{
            height: 70,
            width: 50,
            borderWidth: 1,
            borderColor: COLORS.pink,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <TextInput placeholder='4' style={{
              color: COLORS.black,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }} />
          </View> */}
        </View>



        <View style={{
          marginBottom: 40,
          paddingVertical: 20,
        }}>

          <CustomeButton title={'Verify'} onPress={() => getCodeHandler()} />
        </View>

        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View>
            <Text style={{ color: COLORS.gray, fontSize: 15 }}>
              01:50
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 15 }}>
              resend code
            </Text>
          </View>
        </View>




      </View>
    </SafeAreaView>
  )
}

export default CodeVerificationScreen

const styles = StyleSheet.create({
  digitbtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 70,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 4,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.pink,
    justifyContent: 'center',
    alignItems: 'center',
  },
})