import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderOne3 from '../components/HeaderOne3'
import COLORS from '../../consts/Colors';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';


const MessagesScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.main} />


            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 30,
                        paddingVertical: 30,
                        backgroundColor: COLORS.main
                    }}>
                        <View>
                            <Icons name="arrow-back-ios" size={25} color={COLORS.white} />
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLORS.white,
                            }}>
                                Messages
                            </Text>
                        </View>
                        <View>
                            <Icon name="dots-horizontal" size={25} color={COLORS.white} />
                        </View>
                    </View>

                </View>



                <View style={styles.footer}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 30,
                        paddingVertical: 20,
                        backgroundColor: COLORS.main
                    }}>
                        <View style={{ width: '20%', }}>
                            <Icon name="plus" size={25} color={COLORS.white} />
                        </View>
                        <View style={{ width: '60%', }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: COLORS.gray,
                            }}>
                                Messages
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <View style={{ width: '90%', }}>
                                <Icon name="send" size={25} color={COLORS.white} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


        </SafeAreaView>
  )
}

export default MessagesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    contentContainer: {
        flex: 1,
    },
    footer: {
        height: 120,
        width: '100%'
    }
})