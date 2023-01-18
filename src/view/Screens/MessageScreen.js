import { ScrollView, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderOne3 from '../components/HeaderOne3'
import COLORS from '../../consts/Colors';
import { List, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import FirebaseSetup from '../../../config';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectChatuser, selectPackages, selectStatus, selectUser, status } from '../../../redux/reducers/Reducers';

const { height, width } = Dimensions.get('window')

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



const MessageScreen = ({ navigation }) => {
    const [uploading, setUploading] = useState(false);
    const [text, setText] = useState('');
    const { auth, firebase } = FirebaseSetup();
    const [CurrentuserData, setCurrentUserData] = useState();
    const [ChatUserDetail, setChatUserDetail] = useState();
    const [ChatUserFilter, setChatUserFilter] = useState([]);
    const [ChatUserId, setChatUserId] = useState();
    const [Lock2, setLock] = useState(false);
    const CurrentUser = auth().currentUser.uid;
    const userData = useSelector(selectUser);
    const userPackage = useSelector(selectPackages);
    const reduxChatUser = useSelector(selectChatuser);
    // const dispatch = useDispatch();

    // const status = useSelector(selectStatus);

    // const fetchUsersUid = () => {
    //     setUploading(true)
    //     try {
    //         const userRef = firestore().collection('users')
    //             .doc(CurrentUser)
    //         userRef.onSnapshot((querySnap) => {
    //             // console.log('doc exists: ', querySnap.exists);
    //             if (querySnap.data().PrivateChat) {
    //                 // console.log('private chat here');
    //                 const ChatUid = []
    //                 querySnap.data().PrivateChat.map(chats => {
    //                     // console.log('total chats here', chats.ChatuserDetails.uid);
    //                     ChatUid.push(chats.ChatuserDetails.uid)
    //                 })
    //                 setChatUserId(ChatUid)
    //             } else {
    //                 console.log('private chats not found');
    //                 setChatUserId('')
    //             }
    //         })
    //     } catch (e) {
    //         console.log(e);
    //     }
    //     setUploading(false)
    // };

    // const fetchMatchUsers = (ChatUserId) => {
    //     // console.log('chat id',ChatUserId);
    //     if (!userPackage == '') {
    //         const Package = userPackage.id;
    //         if (Package == 123) {
    //             if (!ChatUserId == '') {
    //                 try {
    //                     const MatchedUser = []
    //                     ChatUserId.map(item => {
    //                         firestore().collection('users').doc(item).onSnapshot(docSnapshot => {
    //                             // console.log('Match User: ', documentSnapshot.data());
    //                             if (docSnapshot.data().PrivateChat) {
    //                                 // console.log('data here');
    //                                 docSnapshot.data().PrivateChat.map(chats => {
    //                                     if (chats.ChatuserDetails.uid == CurrentUser) {
    //                                         MatchedUser.push(docSnapshot.data().userDetails)
    //                                         // console.log('test',chats.ChatuserDetails);
    //                                         // firestore().collection('users').doc(CurrentUser).onSnapshot((documentSnapshot) => {
    //                                         //     const MatchedUser = []
    //                                         //     const allmsg = documentSnapshot.data().PrivateChat.map(mychats => {
    //                                         //         // console.log(mychats.ChatuserDetails.uid);
    //                                         //         if (mychats.ChatuserDetails.uid == item) {
    //                                         //             const mychat = mychats.ChatuserDetails;
    //                                         //             // SentNotice(mychat); 
    //                                         //             // console.log('final chats', mychats.ChatuserDetails);
    //                                         //             return {
    //                                         //                 ...mychat
    //                                         //             }
    //                                         //             // MatchedUser.push(mychats.ChatuserDetails)
    //                                         //         } else {
    //                                         //             return {
    //                                         //                 ...mychats.ChatuserDetails
    //                                         //             }
    //                                         //         }
    //                                         //     })
    //                                         //     // console.log(allmsg);
    //                                         //     setChatUserDetail(allmsg.slice(0, 2))
    //                                         // })
    //                                         //  
    //                                     } else {
    //                                         console.log('no match found');
    //                                         // setChatUserDetail('')
    //                                     }
    //                                     // setChatUserId(chats.ChatuserDetails)
    //                                 })
    //                                 setChatUserDetail(MatchedUser.slice(0, 2))
    //                                 // setChatUserDetail(MatchedUser)
    //                             } else {
    //                                 console.log('data not found');
    //                                 setChatUserDetail('')
    //                             }
    //                         })
    //                     });
    //                 } catch (e) {
    //                     console.log(e);
    //                 }
    //             } else {
    //                 setChatUserDetail('')
    //             }
    //         }
    //         else if (Package == 456) {
    //             if (!ChatUserId == '') {
    //                 try {
    //                     const MatchedUser = []
    //                     ChatUserId.map(item => {
    //                         firestore().collection('users').doc(item).onSnapshot(docSnapshot => {
    //                             // console.log('Match User: ', documentSnapshot.data());
    //                             if (docSnapshot.data()?.PrivateChat) {
    //                                 // console.log('data here');
    //                                 docSnapshot.data().PrivateChat.map(chats => {
    //                                     if (chats.ChatuserDetails.uid == CurrentUser) {
    //                                         MatchedUser.push(docSnapshot.data().userDetails)
    //                                         // console.log('test', docSnapshot.data().userDetails);
    //                                         // const users = [];
    //                                         // console.log('test',chats.ChatuserDetails);
    //                                         // firestore().collection('users').doc(CurrentUser).onSnapshot((documentSnapshot) => {
    //                                         //     const MatchedUser = []
    //                                         //     const allmsg = documentSnapshot.data().PrivateChat.map(mychats => {
    //                                         //         // console.log(mychats.ChatuserDetails.uid);
    //                                         //         if (mychats.ChatuserDetails.uid == item) {
    //                                         //             const mychat = mychats.ChatuserDetails;
    //                                         //             // SentNotice(mychat);

    //                                         //             // console.log('final chats', mychats.ChatuserDetails);
    //                                         //             return {
    //                                         //                 ...mychats.ChatuserDetails
    //                                         //             }
    //                                         //             // MatchedUser.push(mychats.ChatuserDetails)
    //                                         //         } else {
    //                                         //             return {
    //                                         //                 ...mychats.ChatuserDetails
    //                                         //             }
    //                                         //         }
    //                                         //     })
    //                                         //     // console.log(allmsg);
    //                                         //     setChatUserDetail(allmsg.slice(0, 3))
    //                                         // })
    //                                         // console.log('User Matched', ChatUserDetail);
    //                                         // MatchedUser.push(chats.ChatuserDetails)
    //                                     } else {
    //                                         console.log('no match found');
    //                                         setChatUserDetail('')
    //                                     }
    //                                     // setChatUserId(chats.ChatuserDetails)
    //                                 })
    //                                 // setChatUserDetail(MatchedUser)
    //                                 setChatUserDetail(MatchedUser.slice(0, 3))
    //                             } else {
    //                                 console.log('data not found');
    //                                 setChatUserDetail('')
    //                             }
    //                         })
    //                     });
    //                 } catch (e) {
    //                     console.log(e);
    //                 }
    //             } else {
    //                 setChatUserDetail('')
    //             }
    //         }
    //         else {
    //             if (!ChatUserId == '') {
    //                 try {
    //                     const MatchedUser = []
    //                     ChatUserId.map(item => {
    //                         firestore().collection('users').doc(item).onSnapshot(docSnapshot => {
    //                             // console.log('Match User: ', documentSnapshot.data());
    //                             if (docSnapshot.data()?.PrivateChat) {
    //                                 // console.log('data here');
                                    
    //                                 docSnapshot.data().PrivateChat.map(secUser => {
    //                                     if (secUser.ChatuserDetails.uid == CurrentUser) {
    //                                         MatchedUser.push(docSnapshot.data().userDetails)
    //                                         // console.log('test', docSnapshot.data().userDetails);
    //                                         const users = [];
    //                                         // firestore().collection('users').doc(CurrentUser).onSnapshot((documentSnapshot) => {
    //                                         //     // const MatchedUser = []
    //                                         //     const allchats = documentSnapshot.data().PrivateChat.map(mychats => {
    //                                         //         // users.push({
    //                                         //         //     ...mychats.ChatuserDetails,
    //                                         //         // });
    //                                         //         console.log('to filter chats: ', item);
    //                                         //         console.log('mychat: ', mychats.ChatuserDetails.uid);
    //                                         //         // console.log((mychats.ChatuserDetails.uid == item));

    //                                         //         if (mychats.ChatuserDetails.uid == item) {
    //                                         //             // const mychat = mychats.ChatuserDetails;
    //                                         //             // SentNotice(mychat);
    //                                         //             // console.log('final chats', mychats.ChatuserDetails);
    //                                         //             return {
    //                                         //                 ...mychats.ChatuserDetails,
    //                                         //                 // MatchedUser.push(mychats.ChatuserDetails)
    //                                         //             }
    //                                         //         }
    //                                         //         else {
    //                                         //             //console.log('no match found');
    //                                         //             return {
    //                                         //                 ...mychats.ChatuserDetails,
    //                                         //                 // ChatuserDetails: '',
    //                                         //             }
    //                                         //         }
    //                                         //     })
    //                                         //     setChatUserDetail(allchats);
    //                                         //     // console.log('push: ', users);
    //                                         //     // setChatUserFilter(users)
    //                                         // })
    //                                         // const newFiltered = ChatUserFilter?.filter((data, index) => (index === 1 || index === 2));
    //                                         // setChatUserDetail(newFiltered)

    //                                         // console.log('test', newFiltered);
    //                                         // console.log('User Matched', ChatUserDetail);
    //                                         // MatchedUser.push(chats.ChatuserDetails)
    //                                     } else {
    //                                         console.log('no match found');
    //                                         // setChatUserDetail('')
    //                                     }
    //                                     // console.log('push: ',MatchedUser);
    //                                     // setChatUserId(chats.ChatuserDetails)
    //                                 })
    //                                 // console.log('final',MatchedUser);
    //                                 setChatUserDetail(MatchedUser.slice(0, 5))
    //                             } else {
    //                                 console.log('data not found');
    //                                 setChatUserDetail('')
    //                             }
    //                         })
    //                     });
    //                 } catch (e) {
    //                     console.log(e);
    //                 }
    //             } else {
    //                 setChatUserDetail('')
    //             }
    //         }
    //     }
    //     else {
    //         if (!ChatUserId == '') {
    //             try {
    //                 const MatchedUser = []
    //                 ChatUserId.map(item => {
    //                     firestore().collection('users').doc(item).onSnapshot(docSnapshot => {
    //                         // console.log('Match User: ', documentSnapshot.data());
    //                         if (docSnapshot.data().PrivateChat) {
    //                             // console.log('data here');
    //                             docSnapshot.data().PrivateChat.map(chats => {
    //                                 if (chats.ChatuserDetails.uid == CurrentUser) {
    //                                     MatchedUser.push(docSnapshot.data().userDetails)
    //                                     // console.log('test',chats.ChatuserDetails);
    //                                     // firestore().collection('users').doc(CurrentUser).onSnapshot((documentSnapshot) => {
    //                                     //     const MatchedUser = []
    //                                     //     const allmsg = documentSnapshot.data().PrivateChat.map(mychats => {
    //                                     //         // console.log(mychats.ChatuserDetails.uid);
    //                                     //         if (mychats.ChatuserDetails.uid == item) {
    //                                     //             const mychat = mychats.ChatuserDetails;
    //                                     //             // SentNotice(mychat);

    //                                     //             // console.log('final chats', mychats.ChatuserDetails);
    //                                     //             return {
    //                                     //                 ...mychats.ChatuserDetails
    //                                     //             }
    //                                     //             // MatchedUser.push(mychats.ChatuserDetails)
    //                                     //         } else {
    //                                     //             return {
    //                                     //                 ...mychats.ChatuserDetails
    //                                     //             }
    //                                     //         }
    //                                     //     })
    //                                     //     // console.log(allmsg.slice(0, 2));
    //                                     //     setChatUserDetail(allmsg.slice(0, 1))
    //                                     // })
    //                                     // console.log('User Matched', ChatUserDetail);
    //                                     // MatchedUser.push(chats.ChatuserDetails)
    //                                 } else {
    //                                     console.log('no match found');
    //                                     setChatUserDetail('')
    //                                 }
    //                                 // setChatUserId(chats.ChatuserDetails)
    //                                 setChatUserDetail(MatchedUser.slice(0, 1))
    //                             })
    //                         } else {
    //                             console.log('data not found');
    //                             setChatUserDetail('')
    //                         }
    //                     })
    //                 });
    //             } catch (e) {
    //                 console.log(e);
    //             }
    //         } else {
    //             setChatUserDetail('')
    //         }

    //     }
    // };



    const SentNotice = (mychat) => {
        try {
            const noticeStatus = 'Unread';
            const status = 'is your match founded';
            const type = 'Swap';
            const RequestStatus = 'Accepted';
            firestore()
                .collection('notification').doc(CurrentUser).update({
                    Notices: firestore.FieldValue.arrayUnion({
                        uid: mychat.uid,
                        noticeStatus: noticeStatus,
                        status: status,
                        type: type,
                        userName: mychat.FirstName,
                        requestStatus: RequestStatus,
                        // timeStamp: firestore.FieldValue.serverTimestamp(),
                    }),
                })
                .then(() => {
                    console.log('Notices send!');
                });

            firestore()
                .collection('notification').doc(mychat.uid).update({
                    Notices: firestore.FieldValue.arrayUnion({
                        uid: CurrentUser,
                        noticeStatus: noticeStatus,
                        status: status,
                        type: type,
                        userName: userData.FirstName,
                        requestStatus: RequestStatus,
                        // timeStamp: firestore.FieldValue.serverTimestamp(),
                    }),
                })
                .then(() => {
                    console.log('Notices send!');
                });
        } catch (e) {
            console.log(e);
        }
    }

    // const fetchFilterUsers = (FilterChatuid) => {
    //     try {
    //         const userRef = firestore().collection('users')
    //             .doc(CurrentUser)
    //         userRef.onSnapshot((querySnap) => {
    //             const ChatUsers = []
    //             querySnap.data().PrivateChat.map(chats => {
    //                 if (chats.ChatuserDetails.uid == FilterChatuid) {
    //                     console.log('filter chats here: ', chats.ChatuserDetails);
    //                     ChatUsers.push(chats.ChatuserDetails)
    //                 }
    //             })
    //             setChatUserDetail(ChatUsers)
    //         })
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // const fetchNotifictaion = () => {
    //     const noticeRef = firestore().collection('notification')
    //         .doc(CurrentUser)
    //     noticeRef.onSnapshot((querySnap) => {
    //         // console.log(querySnap.exists);
    //         const data = querySnap.data()
    //         // const notify = []
    //         data.Notices.map(item => {
    //             let Lock = item.type;
    //             let uid = item.uid;
    //             console.log(Lock, uid);
    //             fetchUsers()
    //             // {
    //             //     // console.log('filter notices here: ', item);
    //             // }
    //             // else {
    //             //     // console.log('Nonfilter notices here: ', item);
    //             //     fetchUsers();
    //             // }
    //         })
    //         // setNoticeData(notify)
    //     })
    // }

    // useEffect(() => {
    //     fetchUsersUid();
    // }, [])

    // useEffect(() => {

    //     fetchMatchUsers(ChatUserId);
    //     // if (!CurrentuserData == '') {
    //     //     const ChatUsers = []
    //     //     CurrentuserData.PrivateChat.map(Chats => {
    //     //         // console.log('chats', Chats.ChatuserDetails);
    //     //         ChatUsers.push(Chats.ChatuserDetails)
    //     //         // Chats.ChatuserDetails.map(details => {
    //     //         //     console.log(details);
    //     //         // })
    //     //     })
    //     //     // console.log(ChatUsers);
    //     //     setChatUserDetail(ChatUsers)
    //     // } else {
    //     //     console.log('no data found');
    //     // }
    //     // const ChatUsers = []
    //     // let userFullnames = CurrentuserData?.map(element => {
    //     //     element?.PrivateChat?.map(ChatUserDetails => {
    //     //         console.log(ChatUserDetails);
    //     //         ChatUsers.push(ChatUserDetails)
    //     //     });
    //     // })
    //     // setChatUserDetail(ChatUsers);
    // }, [ChatUserId])



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.main} />
            <View style={styles.container}>
                <View style={{
                    padding: 10,
                    paddingTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: COLORS.black
                    }}>Chats!</Text>
                </View>
                <View>
                    <TextInput
                        label="Find a user "
                        value={text}
                        lableTextColor={COLORS.gray2}
                        underlineColor={COLORS.main}
                        placeholderTextColor={COLORS.main}
                        activeOutlineColor={COLORS.main}
                        activeUnderlineColor={COLORS.main}
                        theme={{
                            colors: {
                                uderline: 'white',
                            }
                        }}
                        onChangeText={text => setText(text)
                        }
                        style={styles.TextInput}
                    />
                </View>

                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: COLORS.white
                }}>
                    <View>
                        <Text style={{
                            fontWeight: 'bold',
                            color: COLORS.black,
                            fontSize: 17
                        }}>
                            Messages
                        </Text>
                    </View>

                    {!reduxChatUser == '' ? (
                        <FlatList
                            data={reduxChatUser}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item }) => (
                                <ScrollView
                                    vertical showsVerticalScrollIndicator={false}>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('ChatScreen', {
                                                uid: item.uid,
                                                userName: item.FirstName,
                                                userImg: item.postImg,
                                                userPhone: item.ContactNumber,
                                            })}
                                        >
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingVertical: 15,
                                                borderBottomWidth: 1,
                                                borderBottomColor: COLORS.light,
                                                // height: 100,
                                            }}>
                                                <View style={{
                                                    marginHorizontal: 10,
                                                    borderRadius: 50,
                                                    width: '20%',
                                                }}>
                                                    <Image source={{ uri: item.postImg }} resizeMode='cover'
                                                        style={{
                                                            width: 65,
                                                            height: 65,
                                                            borderRadius: 30,
                                                        }} />
                                                </View>

                                                <View style={{
                                                    width: '65%',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        color: COLORS.black
                                                    }}>{item.FirstName}</Text>
                                                    <Text>say hey..</Text>
                                                </View>

                                                <View style={{
                                                    width: '15%'
                                                }}>
                                                    <Image source={require('../../assets/star.png')} resizeMode="contain"
                                                        style={{
                                                            tintColor: COLORS.gray
                                                        }} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            )}
                        />
                    ) : (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.light,
                        }}>
                            <Text>No Chats here!</Text>
                        </View>
                    )}

                </View>
            </View>

        </SafeAreaView>
    )
}

export default MessageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
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