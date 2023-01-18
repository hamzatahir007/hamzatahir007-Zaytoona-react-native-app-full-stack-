import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreentwo = ({ navigation }) => {

  const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(null);

  useEffect(() => {

    async function launcher() {
      // const appData = await AsyncStorage.getItem('isAppFirstLaunch');
      // console.log(appData);
      // if (appData == null) {
      //   setIsAppFirstLaunch(true);
      //   AsyncStorage.setItem('isAppFirstLaunch', 'false');
      //   setTimeout(() => {
      //     navigation.navigate('OnboardScreen');
      //     console.log('OnboardScreen');
      //   }, 3000);
      // } else {
        setIsAppFirstLaunch(false);
        setTimeout(() => {
          navigation.navigate('DashboardScreen');
          console.log('DashboardScreen');
        }, 3000);
        // const userData = await AsyncStorage.getItem('session');
        // const Currentuser = await AsyncStorage.getItem('CurrentUser');
        // console.log("CurrentUser :", Currentuser);
        // if (userData) {
        //   setTimeout(() => {
        //     navigation.navigate('DashboardScreen');
        //     console.log('DashboardScreen');
        //   }, 3000);
        // }
        // else {
        //   setTimeout(() => {
        //     navigation.navigate('SignUpScreen');
        //     console.log('SignUpScreen');
        //   }, 3000);
        // }
      // }
    }

    launcher();

  }, []);


  //   useEffect(() => {
  //     (async () => {

  //         const userData = await AsyncStorage.getItem('session');
  //         console.log("session :", userData);
  //         if (userData) {
  //           navigation.navigate('DashboardScreen');
  //         } else {
  //           navigation.navigate('SignUpScreen');
  //         }
  //     }
  //     )();
  // }, []);

  // setTimeout(() => {
  //   navigation.navigate('OnboardScreen');
  //   console.log('OnboardScreen');
  // }, 3000);  //5000 milliseconds

  return (
    <ImageBackground source={require('../../assets/splash2.png')} resizeMode="cover" style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      </View>
    </ImageBackground>
  )
}

export default SplashScreentwo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  }
})