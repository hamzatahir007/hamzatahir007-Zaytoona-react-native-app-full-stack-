import { ScrollView, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderOne3 from '../components/HeaderOne3'
import COLORS from '../../consts/Colors';
import { List, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import FirebaseSetup from '../../../config';
import firestore from '@react-native-firebase/firestore';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectStatus, selectUser, status } from '../../../redux/reducers/Reducers';
import Notifictaions from '../components/Notifictaions';

const Masseges = [
    {
        id: '1',
        userName: 'Srto h.',
        userImg: require('../../assets/like1.png'),
        messageText: 'having a good day?'
    },
    {
        id: '2',
        userName: 'Swertw',
        userImg: require('../../assets/profile3.png'),
        messageText: 'Typing...'
    },
    {
        id: '3',
        userName: 'Srto h.',
        userImg: require('../../assets/profile2.png'),
        messageText: 'having a good day back?'
    },
]

const ChatScreen = ({ navigation, route }) => {
    const uid = route.params.uid;
    const userName = route.params.userName;
    const userImg = route.params.userImg;
    const userPhone = route.params.userPhone;
    // console.log('confirm uid: ', uid);

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const { auth, firebase } = FirebaseSetup();
    const [CurrentuserData, setCurrentUserData] = useState();
    const [ChatUserDetail, setChatUserDetail] = useState();
    const [Lock, setLock] = useState(false);
    const user = auth().currentUser.uid
    const dispatch = useDispatch();
    const Currentuser = useSelector(selectUser);

    // const Users = useSelector(selectUser);
    // const status = useSelector(selectStatus);
    // console.log('new status', status);

    // const status = useSelector(selectStatus);
    // console.log('status: ', status.status);

    // const getAllMessages = async () => {
    //     const docid = uid > user ? user + "-" + uid : uid + "-" + user
    //     const querySnap = await firestore().collection('chatrooms')
    //         .doc(docid)
    //         .collection('messages')
    //         .orderBy('createdAt', "desc")
    //         .get()
    //     const allmsg = querySnap.docs.map(docSanp => {
    //         return {
    //             ...docSanp.data(),
    //             createdAt: docSanp.data().createdAt.toDate()
    //         }
    //     })
    //     setMessages(allmsg)
    // }

    const goToMessages = () => {
        navigation.goBack()
        // console.log('goback');
    }

    useEffect(() => {
        // getAllMessages()
        const docid = uid > user ? user + "-" + uid : uid + "-" + user
        const messageRef = firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .orderBy('createdAt', "desc")
        messageRef.onSnapshot((querySnap) => {
            const allmsg = querySnap.docs.map(docSanp => {
                // console.log('date: ', docSanp.data());
                const data = docSanp.data();
                if (data.createdAt) {
                    return {
                        ...docSanp.data(),
                        createdAt: docSanp.data().createdAt.toDate(),
                    }
                } else {
                    return {
                        ...docSanp.data(),
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        // user: {
                        //     avatar: userImg,
                        // },
                    }
                }
            })
            setMessages(allmsg)
        })

        // setMessages([
        //     {
        //         _id: 1,
        //         text: 'Hello developer',
        //         createdAt: new Date(),
        //         user: {
        //             _id: 2,
        //             name: 'React Native',
        //             avatar: userImg,
        //         },
        //     },
        // ])
        // setLock
    }, [])



    const onSend = useCallback((messages = []) => {
        const msg = messages[0]
        const mymsg = {
            ...msg,
            sentBy: user,
            sentTo: uid,
            createdAt: new Date()
        }
        // console.log(mymsg);
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const docid = uid > user ? user + "-" + uid : uid + "-" + user


        firestore().collection('chatrooms')
            .doc(docid)
            .collection('messages')
            .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
    }, [])

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: COLORS.main,
                    }
                }}
                textStyle={{
                    right: {
                        color: COLORS.white
                    }
                }}
            />
        )
    }

    const renderInputToolbar = (props) => {
        return <InputToolbar {...props}
            containerStyle={{ borderWidth: 1, borderColor: COLORS.light, borderRadius: 20 }}
        />
    }

    // useEffect(() => {
    // },[user])
    // const SentNotice = () => {
    //     try {
    //         const noticeStatus = 'Unread';
    //         const status = 'Want to lock you!';
    //         const type = 'Lock';
    //         const RequestStatus = 'Unaccepted';
    //         firestore()
    //             .collection('notification').doc(uid).update({
    //                 Notices: firestore.FieldValue.arrayUnion({
    //                     uid: user,
    //                     noticeStatus: noticeStatus,
    //                     status: status,
    //                     type: type,
    //                     userName: Currentuser.FirstName,
    //                     requestStatus: RequestStatus,
    //                     // timeStamp: firestore.FieldValue.serverTimestamp(),
    //                 }),
    //             }, { merge: false })
    //             .then(() => {
    //                 console.log('Notices send!');
    //             });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    const UnLockChatUser = () => {
        setLock(!Lock)
        dispatch(status(Lock))
        UpdateMyLockStatus(user);
        UpdateChatUserLockStatus(uid);
        console.log('user unlock');
    }
    const UpdateMyLockStatus = (user) => {
        const userRef = firestore().collection('users')
            .doc(user)
        userRef.update({
            'userDetails.UserLock': false,
        })
    }
    const UpdateChatUserLockStatus = (uid) => {
        const userRef = firestore().collection('users')
            .doc(uid)
        userRef.update({
            'userDetails.UserLock': false,
        })
    }


    const LockChatUser = () => {
        ToastAndroid.show('Lock request send', ToastAndroid.SHORT)
        setLock(!Lock)
        // dispatch(status(Lock))
        // var Data = new Object();
        // Data.status = Lock;
        // console.log(Lock);
        // dispatch(login(prevState => [...prevState, { status: 'lock' }])
        Notifictaions(
            Docuser = uid,
            noticeStatus = 'Unread',
            tag = 'Want to lock you!',
            type = 'Lock',
            RequestStatus = 'Unaccepted',
            noticeID = user,
            NoticeName = Currentuser.FirstName,
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.main} />
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    height: '10%',
                    backgroundColor: COLORS.white,
                }}>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity
                            onPress={() => goToMessages()}
                            style={{
                                paddingRight: 10,
                                justifyContent: 'center'
                            }}>
                            <Image source={require('../../assets/arrowleft.png')} resizeMode='contain'
                                style={{
                                    tintColor: COLORS.black,
                                }}
                            />
                        </TouchableOpacity>
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'center',
                        }}>
                            <Image source={{ uri: userImg }} resizeMode='contain'
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40,
                                }}
                            />
                        </View>
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>{userName}</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        {/* <TouchableOpacity style={{
                            paddingRight: 10,
                            justifyContent: 'center'
                        }}>
                            <Image source={require('../../assets/call.png')} resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.black,
                                }}
                            />
                        </TouchableOpacity> */}
                        {Lock === true ? (
                            <TouchableOpacity
                                onPress={() => UnLockChatUser()}
                                // onPress={() => LockChatUser()}
                                style={{
                                    paddingRight: 10,
                                    justifyContent: 'center'
                                }}>
                                <Image source={require('../../assets/lock2.png')} resizeMode='contain'
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.black,
                                    }}
                                />
                            </TouchableOpacity>

                        ) : (
                            <TouchableOpacity
                                // onPress={() => setLock(true)}
                                onPress={() => LockChatUser()}
                                style={{
                                    paddingRight: 10,
                                    justifyContent: 'center'
                                }}>
                                <Image source={require('../../assets/unlock2.png')} resizeMode='contain'
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.black,
                                    }}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: user,
                        }}
                        renderBubble={renderBubble}
                    // renderInputToolbar={renderInputToolbar}
                    />
                </View>

            </View>

        </SafeAreaView >
    )
}

export default ChatScreen

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
    },
    TextInput: {
        backgroundColor: COLORS.transparent,
        color: COLORS.gray2,
    },
})