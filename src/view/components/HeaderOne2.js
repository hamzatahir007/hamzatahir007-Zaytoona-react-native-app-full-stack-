import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");


const HeaderOne2 = () => {
  return (
    <View style={{ height: '15%',}}>

      <View style={{ justifyContent: 'flex-start' }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: 5,
        }}>
          <Text style={{ color: COLORS.gray, fontSize:12, }}>English</Text>
          <Icon name="web" size={15} color={COLORS.gray} />
        </View>
        <View style={{alignItems:'center' ,justifyContent:'center'}}>
          <Image source={require('../../assets/logo3.png')}
            style={{
              height: '65%', width: '70%',
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default HeaderOne2

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: width,
  },
})