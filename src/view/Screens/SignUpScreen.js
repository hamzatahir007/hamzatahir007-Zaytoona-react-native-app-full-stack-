import { Alert, Dimensions, Image, ImageBackground, SafeAreaView, StatusBar, ToastAndroid, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import COLORS from '../../consts/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderOne from '../components/HeaderOne';
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import SocialButtons from '../components/SocialButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseSetup from '../../../config';
import auth from '@react-native-firebase/auth';


const { width, height } = Dimensions.get("window");


const SignUpScreen = ({ navigation }) => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [uploading, setUploading] = useState(false);
  // const { auth } = FirebaseSetup();

  const [code, setCode] = useState('');


  const [inputerror, setInputError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  // const recaptchaVerifier = useRef(null);
  const [googleSubmitting, setGoogleSubmitting] = useState(false)

  const [userToken, setUserToken] = React.useState(null);

  const regex = new RegExp("\\+\\d+$");

  const OnhandleSubmit = () => {
    if (phoneNumber == '' || phoneNumber.length < 11 || phoneNumber == isNaN || !phoneNumber === regex.test(phoneNumber)) {
      setInputError(true)
      if (phoneNumber == '') {
        ToastAndroid.show('Please enter your phone number', ToastAndroid.SHORT)
      }
      else if (phoneNumber.length < 11) {
        ToastAndroid.show('phone number should be 11 digits', ToastAndroid.SHORT)
      }
      else if (phoneNumber == isNaN) {
        ToastAndroid.show('Phone number is required', ToastAndroid.SHORT)
      }
      else if (!phoneNumber === regex.test(phoneNumber)) {
        ToastAndroid.show('Phone number must be starting with +', ToastAndroid.SHORT)
      }
    }
    else {
      setInputError(false);
      // NavCode(phoneNumber)
      onSignInPressed(phoneNumber)
    }
  }

  const onSignInPressed = async () => {
    try {
      setUploading(true);
      const response = await auth().signInWithPhoneNumber(phoneNumber);
      console.log('Phone Number', response);
      // setLoading(false);
      navigation.navigate('CodeVerificationScreen', { confirmation: response, phoneNum: phoneNumber });
      ToastAndroid.show("OTP Send Successfully!", ToastAndroid.SHORT);
      setUploading(false)
    } catch (error) {
      console.log("OTP SEND ERROR" + error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }

  };

  // Handle the button press
  // async function signInWithPhoneNumber(phoneNumber) {
  //   setUploading(true);
  //   try {
  //     await auth().signInWithPhoneNumber(phoneNumber).then((data) => {
  //       navigation.navigate('CodeVerificationScreen', {
  //         confirm: data,
  //       })

  //     })
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  //   setUploading(false);


  //   // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //   // setConfirm(confirmation);
  //   // return confirmation;
  // }



  // const NavCode = async (phoneNumber) => {
  //   setUploading(true);
  //   try {
  //     await signInWithPhoneNumber(phoneNumber).then((data) => {
  //       // console.log(data);
  //       // setConfirm(data)
  //       navigation.navigate('CodeVerificationScreen', {
  //         confirm: data,
  //       })

  //     })
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  //   setUploading(false);
  // }


  // Handle the button press
  // const signInWithPhoneNumber = async () => {
  //   console.log(phoneNumber);
  //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //   setConfirm(confirmation);
  //   // console.log(Confirm);
  //   ToastAndroid.show('Verification code has been sent to your phonenumber.', ToastAndroid.SHORT)
  //   navigation.navigate('CodeVerificationScreen', {
  //     confirm: Confirm,
  //   })
  // }

  // const ConfirmCode = async () => { +923211156718
  //   try {
  //     await confirm.confirm(code);
  //     alert('User Sign In Successfully')
  //   } catch (err) {
  //     alert(JSON.stringify(err))
  //   }
  // }


  const handleGoogleSignin = async () => {

    console.log('google');

  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.main} />
      <HeaderOne />

      <View style={{ height: '70%', }}>

        <ScrollView>

          <View>
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <Text style={{
                color: COLORS.blue,
                fontSize: 20,
              }}>Find Your Perfect Match Today!</Text>
            </View>
            <View style={{ paddingHorizontal: 20, }}>
              <Text style={{
                color: COLORS.black,
                fontSize: 15,
              }}> Phone Number </Text>
            </View>




            <View style={styles.container}>
              <TextInput
                // label={'Phone number with country code'}
                lableTextColor={COLORS.gray2}
                value={phoneNumber}
                placeholder={'+923494499847'}
                error={inputerror}
                placeholderTextColor={COLORS.gray2}
                mode='outlined'
                // outlineColor={COLORS.gray}
                autoComplete='tel'
                keyboardType='phone-pad'
                onFocus={() => setInputError(false)}
                activeOutlineColor={COLORS.gray}
                activeUnderlineColor={COLORS.gray}
                theme={{
                  colors: {
                    uderline: 'white',
                  }
                }}
                onChangeText={phoneNumber => setPhoneNumber(phoneNumber)
                }
                style={styles.TextInput}
              />
            </View>

            {!uploading == true ? (
              <View style={{
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>

                <View style={{ height: 50 }}>
                  <TouchableOpacity style={styles.btn}
                    // onPress={sendVerifictaion}
                    onPress={OnhandleSubmit}
                  >
                    <Text style={{ fontSize: 18, }}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>

            ) : (
              <View style={{
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
                <View style={{ height: 50 }}>
                  <TouchableOpacity style={styles.btn}
                  >
                    <ActivityIndicator size="small" color={COLORS.gray} animating={uploading} />
                  </TouchableOpacity>
                </View>
              </View>
            )
            }



            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 25,
              paddingVertical: 10,
            }}>
              <View style={{ flex: 1, height: 1, backgroundColor: COLORS.pink }} />
              <View>
                <Text style={{
                  width: 50,
                  textAlign: 'center',
                  color: COLORS.gray,
                  fontSize: 15,
                  fontWeight: 'bold'
                }}>Or</Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: COLORS.pink }} />
            </View>

            <SocialButtons title={'Continue with Facebook'} image={require('../../assets/facebook.png')} />

            <SocialButtons googleSubmitting={googleSubmitting} onpress={handleGoogleSignin} title={'Continue with Google'} image={require('../../assets/google.png')} />

            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10
            }}>
              <Text style={{}}>Continue with Email</Text>
            </View>

            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontSize: 10, color: COLORS.gray, width: '50%',
                textAlign: 'center'
              }}>
                By continuing you agree to our
                <Text style={{
                  color: COLORS.black,
                  borderBottomColor: COLORS.black,
                  borderBottomWidth: 2
                }}> Tearms & Conditions </Text>
                and Privacy policy
              </Text>
            </View>

          </View>
        </ScrollView>
      </View >
    </SafeAreaView >
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
  },
  TextInput: {
    borderRadius: 20,
    backgroundColor: COLORS.mainlight,
    color: COLORS.gray2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 4,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
})