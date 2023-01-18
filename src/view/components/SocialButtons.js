import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const SocialButtons = ({ googleSubmitting, title, image, onpress }) => {
  return (
    <View style={{
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      paddingVertical: 10,
    }}>

      <View style={{ height: 50 }}>
        {!googleSubmitting && (
          <TouchableOpacity onPress={onpress} style={[styles.btn, { flexDirection: 'row' }]} activeOpacity={0.8}>
            <Image source={image} resizeMode="contain"
              style={{
                width: 25,
                height: 25,
              }}
            />
            <Text style={{
              fontSize: 15,
              paddingHorizontal: 5,
              color: COLORS.gray2
            }}>{title}</Text>
          </TouchableOpacity>
        )}

        {googleSubmitting && (
          <TouchableOpacity disabled={true} style={[styles.btn, { flexDirection: 'row' }]} activeOpacity={0.8}>
            <ActivityIndicator size="large" color={COLORS.main} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default SocialButtons

const styles = StyleSheet.create({
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