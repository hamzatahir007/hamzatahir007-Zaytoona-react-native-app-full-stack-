import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HeaderOne3 = ({ icon }) => {
    return (
        <View style={{ height: '10%', backgroundColor: COLORS.main }}>

            {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingHorizontal: 5,
                }}>
                    <Text style={{ color: COLORS.gray }}>English</Text>
                    <Icon name="web" size={20} color={COLORS.gray} />
                </View> */}
            <View style={{
                justifyContent: 'center',
                flexDirection: 'row',
            }}>
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                }}>
                    <Image source={require('../../assets/logo01.png')}
                        style={{
                            height: '65%', width: '50%',
                            resizeMode: 'contain',
                            // backgroundColor:'#ccc',
                        }}
                    />
                </View>
                <View style={{ justifyContent: 'center', paddingRight: 10 }}>
                    <Icon name={icon} size={30} color={COLORS.white} />
                </View>
            </View>
        </View>
    )
}

export default HeaderOne3

const styles = StyleSheet.create({})