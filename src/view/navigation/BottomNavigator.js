import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import COLORS from '../../consts/Colors';

import DashboardScreen from '../Screens/DashboardScreen';
import SattingScreen from '../Screens/SattingScreen';
import MessageScreen from '../Screens/MessageScreen';
import SwapScreen from '../Screens/SwapScreen';
import SearchScreen from '../Screens/SearchScreen';
import NotificationScreen from '../Screens/NotificationScreen.js';
import ChatScreen from '../Screens/ChatScreen';
import ProfileUpdateScreen from '../Screens/ProfileUpdateScreen';
import firestore from '@react-native-firebase/firestore';
import FirebaseSetup from '../../../config';
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';
import { selectStatus } from '../../../redux/reducers/Reducers';


const Tab = createBottomTabNavigator();


const MessageStack = () => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Tab.Screen name='MessageScreen' component={MessageScreen} />
        <Tab.Screen name='ChatScreen' component={ChatScreen} />
    </Tab.Navigator>
)

const SattingStack = () => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Tab.Screen name='SattingScreen' component={SattingScreen} />
        <Tab.Screen name='ProfileUpdateScreen' component={ProfileUpdateScreen} />
    </Tab.Navigator>
)


const BottomNavigator = () => {
    // const [noticeExist, setNoticeExit] = useState(false);
    // const [noticeData, setNoticeData] = useState()
    // const [showTab, setShowTab] = useState(true);
    const [alertNotice, setAlertNotice] = useState([]);
    const { auth, firebase } = FirebaseSetup();
    const currentUser = auth().currentUser.uid;
    const status = useSelector(selectStatus);
    // console.log('status: ', status);


    const GetReadNotices = () => {
        try {
            const noticeRef = firestore().collection('notification').doc(currentUser)
            noticeRef.onSnapshot((querySnap) => {
                // console.log('doc exit ', querySnap.exists);
                if (querySnap.exists) {
                    const alertnotice = []
                    querySnap.data()?.Notices.map(item => {
                        if (item.noticeStatus == 'Unread') {
                            // console.log('notices here: ', item);
                            alertnotice.push(item);
                        }
                    })
                    setAlertNotice(alertnotice)
                }
                else{
                    setAlertNotice('')
                }
            })
            // console.log('alertNotice' , alertNotice);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {

        GetReadNotices();
    }, [])


    // useEffect(() => {
    // }, [alertNotice])


    return (
        <Tab.Navigator initialRouteName="DashboardScreen"
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    // height: 70,
                    paddingHorizontal: 20,
                    paddingTop: 0,
                    backgroundColor: COLORS.white,
                    position: 'absolute',
                    borderTopWidth: 0,
                    elevation: 20,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                },
            }}>
            <Tab.Screen name="Home" component={DashboardScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // flexDirection: 'row',
                                    backgroundColor: COLORS.mainlight2,
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                    <Image
                                        source={require('../../assets/home.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12 }}>Home</Text>
                                </View>
                            ) : (
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <Image
                                        source={require('../../assets/home.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.main,
                                        }}
                                    />
                                </View>
                            )
                            }
                        </View>
                    )
                }} />

            <Tab.Screen name="NotificationScreen" component={NotificationScreen}
                options={{
                    tabBarBadge: alertNotice.length ? alertNotice.length : 0,
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (

                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // flexDirection: 'row',
                                    backgroundColor: COLORS.mainlight2,
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                    <Image
                                        source={require('../../assets/notification.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.main,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12 }}>Notice</Text>
                                </View>
                            ) : (
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <Image
                                        source={require('../../assets/notification.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.main,
                                        }}
                                    />
                                </View>
                            )
                            }
                        </View>
                    )
                }} />

            <Tab.Screen name="Message" component={MessageStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                    // flexDirection: 'row',
                                    backgroundColor: COLORS.mainlight2,
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                    <Image
                                        source={require('../../assets/message.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12 }}>Message</Text>
                                </View>
                            ) : (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Image
                                        source={require('../../assets/message.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.main,
                                        }}
                                    />
                                </View>
                            )

                            }
                        </View>
                    )
                }} />


            {status == false ? (
                <Tab.Screen name="SwapScreen" component={SwapScreen}
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <View>
                                {focused == true ? (
                                    <View style={{
                                        alignItems: 'center', justifyContent: 'center',
                                        // flexDirection: 'row',
                                        backgroundColor: COLORS.mainlight2,
                                        padding: 5,
                                        borderRadius: 5,
                                    }}>
                                        <Image
                                            source={require('../../assets/swap.png')}
                                            resizeMode='contain'
                                            style={{
                                                height: 20,
                                                width: 20,
                                                tintColor: focused ? COLORS.black : COLORS,
                                            }}
                                        />
                                        <Text style={{ paddingLeft: 5, fontSize: 12 }}>Swap</Text>
                                    </View>
                                ) : (
                                    <View style={{
                                        alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Image
                                            source={require('../../assets/swap.png')}
                                            resizeMode='contain'
                                            style={{
                                                height: 30,
                                                width: 30,
                                                // tintColor: focused ? COLORS.black : COLORS.main,
                                            }}
                                        />
                                    </View>
                                )
                                }
                            </View>

                        )
                    }} />
            ) : null}



            <Tab.Screen name="SattingStack" component={SattingStack}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <View>
                            {focused == true ? (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                    // flexDirection: 'row',
                                    backgroundColor: COLORS.mainlight2,
                                    padding: 5,
                                    borderRadius: 5
                                }}>
                                    <Image
                                        source={require('../../assets/setting.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.gray2,
                                        }}
                                    />
                                    <Text style={{ paddingLeft: 5, fontSize: 12 }}>Setting</Text>
                                </View>
                            ) : (
                                <View style={{
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Image
                                        source={require('../../assets/setting.png')}
                                        resizeMode='contain'
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: focused ? COLORS.black : COLORS.main,
                                        }}
                                    />
                                </View>
                            )

                            }
                        </View>
                    )
                }} />
        </Tab.Navigator>
    )
}

export default BottomNavigator

const styles = StyleSheet.create({})