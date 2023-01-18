import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderOne from '../components/HeaderOne'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton'

const VerificationScreen = ({ navigation }) => {
  // const {name , email,  photoUrl} = route.params;
  // const avatarImg = photoUrl ? { uri: photoUrl } : require('../../assets/user.png');
  // const headingName = name ? { name } : 'Lets Create Your Profile';


  const OnDashboardScreen = () => (
    navigation.navigate('DashboardScreen')
  )


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
            <Image source={require('../../assets/verify.png')} resizeMode="contain"
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
              width: '60%',
              color: COLORS.black,
            }}>Let's Create Your Profile</Text>
          </View>
          <View>
            <Text style={{
              color: COLORS.gray,
              width: '90%',
              fontSize: 15,
            }}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
            .</Text>
          </View>
        </View>

        <View style={{ paddingVertical: 40 }}>
          <CustomeButton title={'Verify'} onPress={OnDashboardScreen} />
        </View>







      </View>
    </SafeAreaView>
  )
}

export default VerificationScreen

const styles = StyleSheet.create({})