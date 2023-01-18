import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../consts/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderOne3 from '../components/HeaderOne3';
import firestore from '@react-native-firebase/firestore';
import FirebaseSetup from '../../../config';
import { selectPackages, selectStatus, selectUser } from '../../../redux/reducers/Reducers';
import { packages, chatuser } from '../../../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';


const MemberShips = [
    {
        id: '1',
        title: 'Basic Membership',
        Detail: 'Unlocks political view and religion filter',
        price: '$4.99/Month',
        infoTitle: 'Whats in Basic Membership',
        info1: 'Unlocak political and religion filter',
        info2: '15 likes Per Day',
        info3: '5 Max Matches',
    },
    {
        id: '2',
        title: 'Gold Membership',
        Detail: 'Unlocks all filter 40per day',
        price: '$9.99/Month',
        infoTitle: 'Whats in Gold Membership',
        info1: 'Unlocak political and religion filter',
        info2: '25 likes Per Day',
        info3: '10 Max Matches',
    },
    {
        id: '3',
        title: 'Diamond Membership',
        Detail: 'Unlocks suggested matches unlimited likes',
        price: '$12.99/Month',
        infoTitle: 'Whats in Diamond Membership',
        info1: 'Unlocak political and religion filter',
        info2: '35 likes Per Day',
        info3: '20 Max Matches',
    },
]

const DashboardScreen = () => {
    const [ChatUserId, setChatUserId] = useState();
    const [ChatUserDetail, setChatUserDetail] = useState();
    const { auth, firebase } = FirebaseSetup();
    const [memberships, setMemberships] = useState();
    const [membershipUid, setMembershipUid] = useState();
    const [buyPack, setBuyPack] = useState(false);
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();
    // const user = useSelector(selectUser);
    const CurrentUser = auth().currentUser.uid;
    const userPackage = useSelector(selectPackages);
    // console.log(userPackage);
    // const status = useSelector(selectStatus);
    const userData = useSelector(selectUser);
    // console.log('curretnuser',userData);

    const ByMemeberShips = (item) => {
        var Data = new Object();
        Data.discountPercentage = item.discountPercentage;
        Data.discountPrice = item.discountPrice;
        Data.id = item.id;
        Data.name = item.name;
        Data.numberOfCards = item.numberOfCards;
        Data.numberOfChats = item.numberOfChats;
        Data.otherCategory = item.otherCategory;
        Data.rate = item.rate;
        Data.status = item.status;
        Data.description = item.description;
        // console.log('test data: ', Data);
        dispatch(packages(Data))
        // console.log(MembershipName);
        // console.log(item.id);
        const MembershipName = item.otherCategory.split(' ')[0]
        const useRef = firestore().collection('users')
            .doc(CurrentUser)
        useRef.update({
            'userDetails.AccountType': MembershipName,
            'userDetails.PackageId': item.id,
        }).then(() => {
            setBuyPack(true)
            // console.log('Notices send!');
        });
    }
    const fetchMemberships = async () => {
        setUploading(true)
        try {
            // console.log('hello');
            await firestore()
                .collection('Package')
                .get()
                .then(querySnapshot => {
                    // console.log('Total user: ', querySnapshot.size);
                    const membership = [];
                    const membershipsuid = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        // console.log('memberships ID: ', documentSnapshot.id, documentSnapshot.data());
                        membership.push(documentSnapshot.data());
                        membershipsuid.push(documentSnapshot.id);
                    });
                    setMemberships(membership)
                    setMembershipUid(membershipsuid)
                })
            // console.log('membershipData: ', memberships);

        } catch (e) {
            console.log(e);
        }
        setUploading(false)
    };


    const fetchUsersUid = () => {
        setUploading(true)
        if (CurrentUser) {
            try {
                const userRef = firestore().collection('users')
                    .doc(CurrentUser)
                userRef.onSnapshot((querySnap) => {
                    // console.log('doc exists: ', querySnap.data());
                    if (!querySnap.data()?.PrivateChat) {
                        console.log('private chats not found');
                        setChatUserId('')
                        // console.log('private chat here');
                    } else {
                        const ChatUid = []
                        querySnap.data()?.PrivateChat.map(chats => {
                            // console.log('total chats here', chats.ChatuserDetails.uid);
                            ChatUid.push(chats.ChatuserDetails.uid)
                        })
                        setChatUserId(ChatUid)
                    }
                })
            } catch (e) {
                console.log(e);
            }
            setUploading(false)
        }
        else {
            dispatch(chatuser(null))
            setChatUserDetail(null)
        }
    };

    const fetchUserMain = () => {
        // console.log('testing: ', userData.userLock);
        if (userData.userLock == true) {
            fetchLockUser(ChatUserId);
        } else {
            fetchMatchUsers(ChatUserId);
        }
    }

    const fetchLockUser = (ChatUserId) => {
        // console.log('lock user here');
        if (!ChatUserId == '') {
            try {
                const LockedUser = []
                ChatUserId.map(item => {
                    firestore().collection('users').doc(item).onSnapshot(docSnapshot => {
                        // console.log('Match User: ', documentSnapshot.data());
                        if (docSnapshot.data()?.PrivateChat) {
                            const UserDetailLock = docSnapshot.data().userDetails.UserLock;
                            // console.log('LockUser: ',userdetails);
                            if (UserDetailLock == true) {
                                docSnapshot.data()?.PrivateChat.map(secUser => {
                                    if (secUser.ChatuserDetails.uid == CurrentUser) {
                                        // console.log('Lockeduser', docSnapshot.data().userDetails);
                                        LockedUser.push(docSnapshot.data().userDetails)
                                    }
                                    else {
                                        console.log('no locked user found');
                                    }
                                })
                            }
                            // console.log('data here');
                            // docSnapshot.data().userDetails.map(secUser => {
                            //     if (secUser.ChatuserDetails.uid == CurrentUser) {
                            //         MatchedUser.push(docSnapshot.data().userDetails)
                            //     } else {
                            //         console.log('no match found');
                            //         // setChatUserDetail('')
                            //     }
                            //     // setChatUserId(chats.ChatuserDetails)
                            // })
                            // console.log('final', MatchedUser);
                            // setChatUserDetail(MatchedUser)
                            // console.log('LockedUser', LockedUser);
                            dispatch(chatuser(LockedUser.slice(0, 2)))
                            setChatUserDetail(LockedUser.slice(0, 2))
                        }
                        else {
                            console.log('data not found');
                            setChatUserDetail('')
                        }
                    })
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            setChatUserDetail('')
        }
    }

    const fetchMatchUsers = (ChatUserId) => {
        // console.log('chat id',ChatUserId);
        if (!userPackage == '') {
            const Package = userPackage.id;
            if (Package == 123) {
                if (!ChatUserId == '') {
                    try {
                        const MatchedUser = []
                        ChatUserId.map(item => {
                            firestore().collection('users').doc(item).onSnapshot(docSnapshot => {
                                // console.log('Match User: ', docSnapshot.data().PrivateChat);
                                if (docSnapshot.data()?.PrivateChat != undefined) {
                                    // console.log('data here');
                                    const UserDetailLock = docSnapshot.data().userDetails.UserLock;
                                    if (UserDetailLock == false) {
                                        docSnapshot.data()?.PrivateChat.map(secUser => {
                                            if (secUser.ChatuserDetails.uid == CurrentUser) {
                                                MatchedUser.push(docSnapshot.data().userDetails)
                                            } else {
                                                console.log('no match found');
                                                // setChatUserDetail('')
                                            }
                                            // setChatUserId(chats.ChatuserDetails)
                                        })
                                    }
                                    // console.log('final', MatchedUser);
                                    setChatUserDetail(MatchedUser.slice(0, 2))
                                    dispatch(chatuser(MatchedUser.slice(0, 2)))
                                    // setChatUserDetail(MatchedUser)
                                } else {
                                    console.log('data not found');
                                    setChatUserDetail('')
                                }
                            })
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    setChatUserDetail('')
                }
            }
            else if (Package == 456) {
                if (!ChatUserId == '') {
                    try {
                        const MatchedUser = []
                        ChatUserId.map(item => {
                            firestore().collection('users').doc(item).onSnapshot(docSnapshot => {
                                // console.log('Match User: ', documentSnapshot.data());
                                if (docSnapshot.data()?.PrivateChat) {
                                    // console.log('data here');
                                    docSnapshot.data()?.PrivateChat.map(secUser => {
                                        if (secUser.ChatuserDetails.uid == CurrentUser) {
                                            MatchedUser.push(docSnapshot.data().userDetails)
                                        } else {
                                            console.log('no match found');
                                        }
                                        // setChatUserId(chats.ChatuserDetails)
                                    })
                                    // setChatUserDetail(MatchedUser)
                                    // console.log('final', MatchedUser);
                                    setChatUserDetail(MatchedUser.slice(0, 3))
                                    dispatch(chatuser(MatchedUser.slice(0, 3)))
                                } else {
                                    console.log('data not found');
                                    setChatUserDetail('')
                                }
                            })
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    setChatUserDetail('')
                }
            }
            else {
                if (!ChatUserId == '') {
                    try {
                        const MatchedUser = []
                        ChatUserId.map(item => {
                            firestore().collection('users').doc(item).onSnapshot(docSnapshot => {
                                // console.log('Match User: ', documentSnapshot.data());
                                if (docSnapshot.data()?.PrivateChat) {
                                    // console.log('data here');

                                    docSnapshot.data()?.PrivateChat.map(secUser => {
                                        if (secUser.ChatuserDetails.uid == CurrentUser) {
                                            MatchedUser.push(docSnapshot.data().userDetails)
                                            // console.log('test', docSnapshot.data().userDetails);
                                        } else {
                                            console.log('no match found');
                                            // setChatUserDetail('')
                                        }
                                        // console.log('push: ',MatchedUser);
                                        // setChatUserId(chats.ChatuserDetails)
                                    })
                                    // console.log('final', MatchedUser.slice(0, 5));
                                    // const finalMatch = MatchedUser.slice(0, 5)
                                    setChatUserDetail(MatchedUser.slice(0, 5))
                                    dispatch(chatuser(MatchedUser.slice(0, 5)))
                                } else {
                                    console.log('data not found');
                                    setChatUserDetail('')
                                }
                            })
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    setChatUserDetail('')
                }
            }
        }
        else {
            if (!ChatUserId == '') {
                try {
                    const MatchedUser = []
                    ChatUserId.map(item => {
                        firestore().collection('users').doc(item).onSnapshot(docSnapshot => {
                            // console.log('Match User: ', documentSnapshot.data());
                            if (docSnapshot.data()?.PrivateChat) {
                                // console.log('data here');
                                docSnapshot.data()?.PrivateChat.map(secUser => {
                                    if (secUser.ChatuserDetails.uid == CurrentUser) {
                                        MatchedUser.push(docSnapshot.data().userDetails)
                                    } else {
                                        console.log('no match found');
                                        // setChatUserDetail('')
                                    }
                                    // setChatUserId(chats.ChatuserDetails)
                                })
                                setChatUserDetail(MatchedUser.slice(0, 1))
                                dispatch(chatuser(MatchedUser.slice(0, 1)))
                            } else {
                                console.log('data not found');
                                setChatUserDetail('')
                            }
                        })
                    });
                } catch (e) {
                    console.log(e);
                }
            } else {
                setChatUserDetail('')
            }

        }
    };

    useEffect(() => {
        fetchMemberships();
        fetchUsersUid();
    }, []);


    useEffect(() => {
        fetchUserMain();
        // fetchMatchUsers(ChatUserId);


        // console.log('test',ChatUserDetail);

        // const 


    }, [ChatUserId]);



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.main} />
            <HeaderOne3 />
            <View style={{ height: '90%', }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 20
                }}>
                    <Text style={{
                        color: COLORS.black,
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>Memberships</Text>
                    <Text style={{
                        color: COLORS.gray2, borderBottomColor: COLORS.gray2,
                        borderBottomWidth: 1,
                    }}>Additional Packages</Text>
                </View>


                {memberships ? (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {memberships.map((item, index) => (

                            <View key={index}>
                                <View style={{
                                    marginHorizontal: 10,
                                    marginLeft: 10,
                                    borderRadius: 20,
                                    backgroundColor: COLORS.white,
                                    elevation: 5
                                }}>
                                    <View style={{
                                        backgroundColor: COLORS.white,
                                        borderRadius: 20,
                                        elevation: 5,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 20,
                                            paddingVertical: 20,
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontWeight: 'bold',
                                                fontSize: 15
                                            }}>{item.otherCategory}</Text>

                                            {!item.discountPrice == '' ? (
                                                <Text style={{ color: COLORS.black }}>{item.discountPrice} OFF {item.discountPercentage}%</Text>
                                            ) : (
                                                <Text style={{ color: COLORS.black }}>{item.rate}</Text>
                                            )}

                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 20,
                                        }}>
                                            <Text style={{
                                                color: COLORS.black,
                                                fontSize: 13,
                                                paddingRight: 10
                                            }}>{item.name}</Text>
                                            <Image source={require('../../assets/Premium.png')} resizeMode='contain'
                                                style={{
                                                    width: 50,
                                                    height: 50
                                                }} />
                                        </View>
                                        <View style={{
                                            paddingHorizontal: 20,
                                            paddingBottom: 20,
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start'
                                        }}>
                                            <TouchableOpacity activeOpacity={0.8} style={{
                                                paddingHorizontal: 20,
                                                paddingVertical: 10,
                                                backgroundColor: COLORS.main,
                                                borderRadius: 10,
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{ color: COLORS.white, fontSize: 13 }}>View more</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                        paddingVertical: 20,
                                        borderBottomColor: COLORS.light,
                                        borderBottomWidth: 1,
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 18,
                                            fontWeight: 'bold'
                                        }}>
                                            What's in {item.otherCategory}
                                        </Text>
                                    </View>

                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 20,
                                            paddingVertical: 20,
                                            justifyContent: 'space-between',
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                            }}>
                                                <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10, }}>
                                                    <Image source={require('../../assets/unlock.png')} resizeMode='contain' />
                                                </View>
                                                <View style={{ paddingRight: 30 }}>
                                                    <Text>
                                                        Chat with any {item.numberOfCards} users
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                                            </View>
                                        </View>

                                        {/* <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 20,
                                            paddingVertical: 20,
                                            justifyContent: 'space-between',
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                            }}>
                                                <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10, }}>
                                                    <Image source={require('../../assets/totlikes.png')} resizeMode='contain' />
                                                </View>
                                                <View style={{ paddingRight: 10 }}>
                                                    <Text>{item.info2}</Text>
                                                </View>
                                            </View>
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                                            </View>
                                        </View> */}

                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 20,
                                            paddingVertical: 20,
                                            justifyContent: 'space-between',
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                            }}>
                                                <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                                    <Image source={require('../../assets/matches.png')} resizeMode='contain' />
                                                </View>
                                                <View style={{ paddingRight: 10 }}>
                                                    <Text>Can Swipe upto {item.numberOfChats} users</Text>
                                                </View>
                                            </View>
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                                            </View>
                                        </View>

                                        <View style={{
                                            padding: 20,
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => ByMemeberShips(item, membershipUid)}
                                                activeOpacity={0.8} style={{
                                                    paddingHorizontal: 20,
                                                    paddingVertical: 10,
                                                    backgroundColor: COLORS.main,
                                                    borderRadius: 10,
                                                    alignItems: 'center'
                                                }}>
                                                {/* {buyPack ? (
                                                    <Text style={{ color: COLORS.white, fontSize: 15 }}>{item.status}</Text>
                                                ) : (
                                                    )} */}
                                                <Text style={{ color: COLORS.white, fontSize: 15 }}>Buy Membership</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>



                            </View>
                        ))}
                    </ScrollView>

                ) : (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}>
                        <ActivityIndicator size="small" color={COLORS.main} animating={uploading} />
                    </View>
                )}




            </View>
        </SafeAreaView>
    )
}


function RenderMemeberShipCards({ data }) {
    return (
        <View>
            <View style={{
                marginHorizontal: 10,
                marginLeft: 10,
                borderRadius: 20,
                backgroundColor: COLORS.white,
                elevation: 5
            }}>
                <View style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 20,
                    elevation: 5,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            fontWeight: 'bold',
                            fontSize: 15
                        }}>{item.otherCategory}</Text>

                        {!item.discountPrice == '' ? (
                            <Text style={{ color: COLORS.black }}>{item.discountPrice} OFF {item.discountPercentage}%</Text>
                        ) : (
                            <Text style={{ color: COLORS.black }}>{item.rate}</Text>
                        )}

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            fontSize: 13
                        }}>{item.name}</Text>
                        <Image source={require('../../assets/Premium.png')} resizeMode='contain'
                            style={{
                                width: 50,
                                height: 50
                            }} />
                    </View>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingBottom: 20,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                    }}>
                        <TouchableOpacity activeOpacity={0.8} style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 10,
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: COLORS.white, fontSize: 13 }}>View more</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    borderBottomColor: COLORS.light,
                    borderBottomWidth: 1,
                }}>
                    <Text style={{
                        color: COLORS.black,
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>
                        What's in {item.otherCategory}
                    </Text>
                </View>

                <View>
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10, }}>
                                <Image source={require('../../assets/unlock.png')} resizeMode='contain' />
                            </View>
                            <View style={{ paddingRight: 30 }}>
                                <Text>
                                    {/* <Text
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.description
                                                        }}
                                                    /> */}
                                    {/* {item.description} */}
                                </Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10, }}>
                                <Image source={require('../../assets/totlikes.png')} resizeMode='contain' />
                            </View>
                            <View style={{ paddingRight: 10 }}>
                                <Text>{item.info2}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                <Image source={require('../../assets/matches.png')} resizeMode='contain' />
                            </View>
                            <View style={{ paddingRight: 10 }}>
                                <Text>{item.info3}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../assets/tik.png')} resizeMode='contain' />
                        </View>
                    </View>

                    <View style={{
                        padding: 20,
                    }}>
                        <TouchableOpacity activeOpacity={0.8} style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 10,
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: COLORS.white, fontSize: 15 }}>Current Membership</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>



        </View>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({})