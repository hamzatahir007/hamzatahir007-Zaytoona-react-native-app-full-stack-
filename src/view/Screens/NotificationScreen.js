import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderOne3 from '../components/HeaderOne3'
import COLORS from '../../consts/Colors';
import FirebaseSetup from '../../../config';
import firestore from '@react-native-firebase/firestore';
import { selectUser, status } from '../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import Notifictaions from '../components/Notifictaions';

const users = [
    {
        id: '1',
        userName: 'Srto h.',
        userImg: require('../../assets/profile3.png'),
        status: 'is now following you',
        messageText: 'having a good day?'
    },
    {
        id: '2',
        userName: 'Swertw',
        userImg: require('../../assets/profile3.png'),
        status: 'is now lock you accepted',
        messageText: 'Typing...'
    },
    {
        id: '3',
        userName: 'Srto h.',
        userImg: require('../../assets/profile2.png'),
        status: 'is now following you',
        messageText: 'having a good day back?'
    },
]

const NotificationScreen = () => {
    const { auth, firebase } = FirebaseSetup();
    const [noticeExist, setNoticeExit] = useState(false);
    const [noticeData, setNoticeData] = useState();
    const [alertNotice, setAlertNotice] = useState();
    const [uploading, setUploading] = useState(false);
    const [test, setTest] = useState(false);
    const [list, setList] = useState([]);
    const currentUser = auth().currentUser.uid;
    const dispatch = useDispatch();
    const [Lock2, setLock] = useState(false);
    const userData = useSelector(selectUser);




    const fetchNotices = () => {
        setUploading(true)
        try {
            const noticeRef = firestore().collection('notification')
                .doc(currentUser)
            noticeRef.onSnapshot((querySnap) => {
                // console.log('doc exit ', querySnap.exists);
                if (querySnap.exists) {
                    const notify = []
                    querySnap.data().Notices.map(item => {
                        // console.log('notices here: ', item);
                        notify.push(item)
                        // if (item.timeStamp) {
                        //     return {
                        //         ...item,
                        //         timeStamp: firestore.Timestamp.now(),
                        //     }
                        // } else {
                        //     return {
                        //         ...item,
                        //         timeStamp: firestore.Timestamp.now(),
                        //         // user: {
                        //         //     avatar: userImg,
                        //         // },
                        //     }
                        // }
                    })
                    setNoticeData(notify)
                }
                else {
                    setNoticeData('')
                }
            })
            // console.log('note: ', noticeData);
        } catch (e) {
            console.log(e);
        }
        setUploading(false)
    }

    const getCategory = (noticeData) => {
        // console.log(noticeData);
        // return;
        if (!noticeData == '') {
            const updatedata = noticeData.map(item => {
                // console.log(item);
                return ({ ...item, noticeStatus: 'read' })
            })
            // console.log(updatedata);
            firestore().collection('notification').doc(currentUser).set({
                Notices: updatedata
            }, { merge: true })
        } else {
            console.log('noticeStatus not update');
        }
    }
    // console.log(list);

    const ReqAccepted = (index, noticeData) => {
        dispatch(status(true))
        const data = noticeData[index];

        const Chatuseruid = (data);
        UpdateMyLockStatus(currentUser);
        UpdateChatUserLockStatus(Chatuseruid);
        // SentNotice(Chatuseruid);

        Notifictaions(
            Docuser = Chatuseruid.uid,
            noticeStatus = 'Unread',
            tag = 'Accepted your Lock request!',
            type = 'Lock',
            RequestStatus = 'Accepted',
            noticeID = currentUser,
            NoticeName = userData.FirstName,
        )
        
        // console.log("old notice data", noticeData);
        const updateAccepted = { ...data, requestStatus: 'Accepted' }
        // const Test = []
        
        // console.log(test);
        
        // test = updateAccepted;
        noticeData[index] = updateAccepted;

        const test  = noticeData.filter(test => {
            // console.log(test);
            return test.requestStatus != 'Unaccepted'
        })

        // console.log(test);
        // console.log("new noticedata",noticeData.type);

        const Docres = firestore().collection('notification').doc(currentUser)
        Docres.update({
            Notices: test
        })
    }

    // const SentNotice = (Chatuseruid) => {
    //     try {
    //         const noticeStatus = 'Unread';
    //         const status = 'Accepted your Lock request!';
    //         const type = 'Lock';
    //         const RequestStatus = 'Accepted';
    //         firestore()
    //             .collection('notification').doc(Chatuseruid.uid).update({
    //                 Notices: firestore.FieldValue.arrayUnion({
    //                     uid: currentUser,
    //                     noticeStatus: noticeStatus,
    //                     status: status,
    //                     type: type,
    //                     userName: userData.FirstName,
    //                     requestStatus: RequestStatus,
    //                     // timeStamp: firestore.FieldValue.serverTimestamp(),
    //                 }),
    //             })
    //             .then(() => {
    //                 console.log('Notices send!');
    //             });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    const UpdateMyLockStatus = (currentUser) => {
        const userRef = firestore().collection('users')
            .doc(currentUser)
        userRef.update({
            'userDetails.UserLock': true,
        })
    }


    const UpdateChatUserLockStatus = (Chatuseruid) => {
        const userRef = firestore().collection('users')
            .doc(Chatuseruid.uid)
        userRef.update({
            'userDetails.UserLock': true,
        })
    }

    const ReqRejected = (index, noticeData) => {
        console.log('reject');
        const data = noticeData[index];
        console.log("old notice data", noticeData);
        const updateAccepte = { ...data, requestStatus: 'Rejected' }

        noticeData[index] = updateAccepte;


        firestore().collection('notification').doc(currentUser).update({
            Notices: noticeData
        },
        )
    }

    // .collection("notification")
    // .where("Notices", "array-contains", "Unread")



    useEffect(() => {
        fetchNotices();
    }, [])

    useEffect(() => {
        getCategory(noticeData);
    }, [noticeData])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.main} />
            <HeaderOne3 />
            <View style={{ height: '100%', backgroundColor: COLORS.white }}>
                {noticeData ? (
                    <ScrollView
                        style={{ marginBottom: 100, }}
                        vertical showsVerticalScrollIndicator={false}>
                        {noticeData.map((item, index) => (
                            <View key={index}>
                                <View>
                                    {item.type == 'Lock' ? (
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingVertical: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: COLORS.gray2,
                                            height: 100,
                                        }}>
                                            <View style={{
                                                marginHorizontal: 10,
                                                borderRadius: 50,
                                                width: '15%',
                                            }}>
                                                <Image source={require('../../assets/swap.png')} resizeMode='contain'
                                                    style={{
                                                        width: 65,
                                                        height: 65,
                                                        borderRadius: 10,
                                                    }} />
                                            </View>

                                            <View style={{
                                                width: '45%',
                                                justifyContent: 'center',
                                            }}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    color: COLORS.black,
                                                }}>{item.userName}</Text>
                                                <Text>{item.status}</Text>
                                                <Text>8 min ago</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', width: '20%', }}>
                                                {item.requestStatus == 'Accepted' || item.requestStatus == 'Rejected' ? (
                                                    <View>
                                                        {item.requestStatus == 'Accepted' ? (
                                                            <Text style={{ color: COLORS.blue, fontSize: 10, }}>
                                                                Request {item.requestStatus}!
                                                            </Text>
                                                        ) : (
                                                            <Text style={{ color: 'red', fontSize: 10, }}>
                                                                Request {item.requestStatus}!
                                                            </Text>
                                                        )}
                                                    </View>
                                                ) : (
                                                    <>
                                                        <TouchableOpacity
                                                            onPress={() => ReqAccepted(index, noticeData)}
                                                            style={{
                                                                padding: 10,
                                                            }}>
                                                            <Image source={require('../../assets/tick.png')} resizeMode='contain'
                                                                style={{
                                                                    width: 20,
                                                                    height: 20,
                                                                    tintColor: COLORS.main
                                                                }} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => ReqRejected(index, noticeData)}
                                                            style={{
                                                                padding: 10,
                                                            }}>
                                                            <Image source={require('../../assets/cross.png')} resizeMode='contain'
                                                                style={{
                                                                    width: 20,
                                                                    height: 20,
                                                                    tintColor: 'red'
                                                                }} />
                                                        </TouchableOpacity>
                                                    </>
                                                )}
                                            </View>

                                            <View style={{
                                                width: '20%',
                                                height: '30%',
                                                alignItems: 'center',
                                                paddingRight: 20,
                                                justifyContent: 'center',
                                                // borderColor: COLORS.main,
                                                // borderWidth: 1,
                                            }}>
                                                {item.noticeStatus == 'read' ? (
                                                    <Text style={{
                                                        paddingHorizontal: 5,
                                                        textAlign: 'center',
                                                        fontSize: 10,
                                                        width: '80%',
                                                        color: COLORS.main,
                                                        borderWidth: 1,
                                                        borderColor: COLORS.main
                                                    }}>{item.noticeStatus}</Text>
                                                )
                                                    : (
                                                        <Text style={{
                                                            paddingHorizontal: 5,
                                                            textAlign: 'center',
                                                            fontSize: 10,
                                                            width: '80%',
                                                            backgroundColor: COLORS.main,
                                                            color: COLORS.white
                                                        }}>{item.noticeStatus}</Text>
                                                    )}
                                            </View>


                                        </View>
                                    ) : (
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingVertical: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: COLORS.gray2,
                                            height: 100,
                                        }}>
                                            <View style={{
                                                marginHorizontal: 10,
                                                borderRadius: 50,
                                                width: '15%',
                                            }}>
                                                <Image source={require('../../assets/swap.png')} resizeMode='contain'
                                                    style={{
                                                        width: 65,
                                                        height: 65,
                                                        borderRadius: 10,
                                                    }} />
                                            </View>

                                            <View style={{
                                                width: '65%',
                                                justifyContent: 'center',
                                            }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        color: COLORS.black,
                                                        paddingRight: 10,
                                                    }}>{item.userName}</Text>
                                                    <Text>{item.status}</Text>
                                                </View>
                                                <Text>6:13PM</Text>
                                            </View>

                                            <View style={{
                                                width: '20%',
                                                height: '30%',
                                                alignItems: 'center',
                                                paddingRight: 20,
                                                justifyContent: 'center',
                                                // borderColor: COLORS.main,
                                                // borderWidth: 1,
                                            }}>
                                                {item.noticeStatus == 'read' ? (
                                                    <Text style={{
                                                        paddingHorizontal: 5,
                                                        textAlign: 'center',
                                                        fontSize: 10,
                                                        width: '80%',
                                                        color: COLORS.main,
                                                        borderWidth: 1,
                                                        borderColor: COLORS.main
                                                    }}>{item.noticeStatus}</Text>
                                                )
                                                    : (
                                                        <Text style={{
                                                            paddingHorizontal: 5,
                                                            textAlign: 'center',
                                                            fontSize: 10,
                                                            width: '80%',
                                                            backgroundColor: COLORS.main,
                                                            color: COLORS.white
                                                        }}>{item.noticeStatus}</Text>
                                                    )}
                                            </View>
                                        </View>

                                    )}
                                </View>
                            </View>

                        ))}
                    </ScrollView>
                ) : (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.light,
                        paddingHorizontal:20
                    }}>
                        <Text>No notices found!</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({})