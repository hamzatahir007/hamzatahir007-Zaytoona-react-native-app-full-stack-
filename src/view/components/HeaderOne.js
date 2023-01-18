import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");


const HeaderOne = () => {
  return (
    <View style={{ height: '30%', }}>
        <ImageBackground source={require('../../assets/headerbackground.png')}
          resizeMode="stretch" style={styles.image}>


          <View style={{justifyContent: 'flex-start' }}>
            <View style={{ flexDirection: 'row', 
            justifyContent: 'flex-end',
            paddingHorizontal:5, }}>
              <Text style={{color:COLORS.gray}}>English</Text>
              <Icon name="web" size={20} color={COLORS.gray} />
            </View>
            <Image source={require('../../assets/logo01.png')}
              style={{
                height: '40%', width,
                resizeMode: 'contain',
              }}
            />
          </View>
        </ImageBackground>
      </View>
  )
}

export default HeaderOne

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: width,
      },
})