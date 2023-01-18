import React, { Component, useEffect, useState } from 'react';
import Swiper from 'react-native-deck-swiper';
import { ScrollView, Button, Dimensions, Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Modal, Alert, ToastAndroid } from 'react-native';
import HeaderOne3 from '../components/HeaderOne3';
import COLORS from '../../consts/Colors';
import Ionicon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import FirebaseSetup from '../../../config';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notifictaions from '../components/Notifictaions';
import { selectPackages, selectUser } from '../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';



const { height, width } = Dimensions.get('window')


function RenderCard({ data }) {
  return (
    <View style={styles.card}>
      <View style={{
        height: height,
        // backgroundColor:'red',
        alignItems: 'center',
      }}>
        <ImageBackground
          source={{ uri: data.userDetails.postImg }}
          resizeMode='cover' style={{
            width: width,
            height: height,
            flex: 1,
          }}>
          <View style={{
            flexDirection: 'column',
            paddingHorizontal: 20,
            marginTop: 80,
            flex: 1
          }}>
            <Image source={require('../../assets/info.png')} resizeMode='contain' style={{
              tintColor: COLORS.white,
              width: 20,
              height: 20
            }} />
          </View>

          <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'flex-end', marginBottom: 50 }}>

            <View style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingHorizontal: 0,
              paddingTop: 20,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                  color: COLORS.white,
                  fontSize: 24,
                  fontWeight: 'bold',
                  paddingRight: 10,
                }}>{data.userDetails.FirstName}</Text>
                <Text style={{ fontSize: 20, color: COLORS.white, }}>{data.userDetails.Age}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/pakistan.png')} style={{
                  resizeMode: 'contain',
                  width: 20,
                  height: 20,
                  elevation: 3,
                  marginRight: 2,
                }} />
                <Text style={{ color: COLORS.white, paddingVertical: 5, letterSpacing: 1 }}> {data.userDetails.Country}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                paddingVertical: 5,
                width: '90%',
                // backgroundColor:COLORS.main
              }}>
                <TouchableOpacity style={{
                  backgroundColor: COLORS.yellow,
                  padding: 5,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                  <Ionicon name="user-o" size={15} color={COLORS.white} style={{
                    paddingRight: 5
                  }} />
                  <Text style={{ color: COLORS.white }}>{data.userDetails.AccountType}</Text>
                </TouchableOpacity>
                <Text style={{ padding: 5, color: COLORS.white }}>|</Text>
                <View style={{
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                  <Icon name="briefcase-outline" size={15} color={COLORS.white} style={{
                    paddingRight: 5
                  }} />
                  <Text style={{ color: COLORS.white }}>{data.userDetails.Description}</Text>
                </View>
                <Text style={{ padding: 5, color: COLORS.white }}>|</Text>
                <View style={{
                  padding: 5,
                }}>
                  <Text style={{ color: COLORS.white }}>{data.userDetails.Country}</Text>
                </View>
              </View>
              <View style={{
                flexDirection: 'row',
                paddingVertical: 5,
                justifyContent: 'space-between'
              }}>
                <View style={{
                  padding: 15,
                  backgroundColor: COLORS.gray,
                  borderRadius: 35,
                  alignItems: 'center'
                }}>
                  <Image source={require('../../assets/cross.png')} resizeMode='contain' style={{
                    tintColor: COLORS.white,
                    width: 20,
                    height: 20
                  }} />
                </View>
                <View style={{
                  padding: 15,
                  backgroundColor: COLORS.main,
                  borderRadius: 35,
                  alignItems: 'center',
                }}>
                  <Image source={require('../../assets/message2.png')} resizeMode='contain' style={{
                    tintColor: COLORS.white,
                    width: 20,
                    height: 20
                  }} />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      {/* <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            paddingRight: 10,
          }}>{data.name}</Text>
          <Text style={{ fontSize: 20 }}>24</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../assets/pakistan.png')} style={{
            resizeMode: 'contain',
            width: 20,
            height: 20,
            elevation: 3,
            marginRight: 2,
          }} />
          <Text>{data.Country}</Text>
        </View>
      </View> */}

      {/* <View style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 5,
      }}>
        <TouchableOpacity style={{
          backgroundColor: COLORS.yellow,
          padding: 5,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Ionicon name="user-o" size={15} color={COLORS.white} style={{
            paddingRight: 5
          }} />
          <Text style={{ color: COLORS.white }}>{data.account}</Text>
        </TouchableOpacity>
        <Text style={{ padding: 5, color: COLORS.gray }}> | </Text>
        <View style={{
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Icon name="briefcase-outline" size={15} color={COLORS.gray} style={{
            paddingRight: 5
          }} />
          <Text style={{ color: COLORS.gray }}>{data.Profession}</Text>
        </View>
        <Text style={{ padding: 5, color: COLORS.gray }}> | </Text>
        <View style={{
          padding: 5,
        }}>
          <Text style={{ color: COLORS.gray }}>{data.Country}</Text>
        </View>
      </View> */}


      {/* <View>
        <View style={{
          paddingHorizontal: 20,
          paddingTop: 5,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            paddingRight: 10,
          }}>About me</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingTop: 5,
        }}>
          <View style={{
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.gray2,
            borderRadius: 15,
            marginRight: 5,
          }}>
            <Icons name="height" size={15} color={COLORS.black} style={{
              paddingRight: 5
            }} />
            <Text style={{ color: COLORS.black }}>{data.height}</Text>
          </View>
          <View style={{
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.gray2,
            borderRadius: 15,
            marginRight: 5,
          }}>
            <Icon name="calendar" size={15} color={COLORS.black} style={{
              paddingRight: 5
            }} />
            <Text style={{ color: COLORS.black }}> {data.MarrigeTime} </Text>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingTop: 5,
        }}>
          <View style={{
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.gray2,
            borderRadius: 15,
            marginRight: 5,
          }}>
            <Ionicons name="ring" size={15} color={COLORS.black} style={{
              paddingRight: 5
            }} />
            <Text style={{ color: COLORS.black }}>{data.Status}</Text>
          </View>
        </View>
      </View>

      <View>
        <View style={{
          paddingHorizontal: 20,
          paddingTop: 5,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            paddingRight: 10,
          }}>Religious</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingTop: 5,
        }}>
          <View style={{
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.gray2,
            borderRadius: 15,
            marginRight: 5,
          }}>
            <Icon name="moon" size={15} color={COLORS.black} style={{
              paddingRight: 5
            }} />
            <Text style={{ color: COLORS.black }}>{data.Religious}</Text>
          </View>
          <View style={{
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.gray2,
            borderRadius: 15,
            marginRight: 5,
          }}>
            <Ionicons name="silverware-fork-knife" size={15} color={COLORS.black} style={{
              paddingRight: 5
            }} />
            <Text style={{ color: COLORS.black }}>{data.Food}</Text>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingTop: 5,
        }}>
          <View style={{
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.gray2,
            borderRadius: 15,
            marginRight: 5,
          }}>
            <Icon name="moon" size={15} color={COLORS.black} style={{
              paddingRight: 5
            }} />
            <Text style={{ color: COLORS.black }}>{data.ReligiousType}</Text>
          </View>
        </View>
      </View> */}
    </View >
    // <View style={styles.card}>
    //   <Text style={styles.text}>{card} - {index}</Text>
    // </View>
  )
};
function StatusCard({ text }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{text}</Text>
    </View>
  );
};

function RenderModal({ data }) {
  console.log(data);
  // return (
  //   <View style={styles.cardsText}>
  //     <Text>{data.name}</Text>
  //   </View>
  // );
};


// demo purposes only
// function* range(start, end) {
//   for (let i = start; i <= end; i++) {
//     yield i
//   }
// };

const SwapScreen = ({ navigation }) => {
  const [users, setUsers] = useState();
  const [CurrentuserData, setCurrentUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState();
  const [modalData, setModalData] = useState();
  const [modalDataUid, setModalDataUid] = useState();
  const [swapLeft, setSwapLeft] = useState([]);
  const [swipedAllCards, setswipedAllCards] = useState(false);
  const [swipeDirection, setswipeDirection] = useState('');
  const [cardIndex, setcardIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { auth, firebase } = FirebaseSetup();
  const CurrentUser = auth().currentUser.uid;
  const user = useSelector(selectUser);
  const userPackage = useSelector(selectPackages);
  // console.log(user.accountType);

  const fetchusersMain = async () => {
    // const userData = await AsyncStorage.getItem('CurrentUserData');
    // console.log(user.gender);
    // let Gender = JSON.parse(userData);
    console.log(user.gender);
    if (user.gender == 'Male') {
      fetchFemaleUsers();
      // testfectch();
    }
    else {
      fetchMaleUsers();
    }
  }

  const fetchMaleUsers = async () => {
    // const Package = userPackage.otherCategory;
    // console.log(Package);
    // for pacakges
    if (!userPackage == '') {
      const Package = userPackage.id;
      console.log('male filter', Package);
      // for basic package 
      if (Package == 123) {
        await firestore()
          .collection('users')
          .where("userDetails.Gender", '==', "Male")
          .limit(2)
          .onSnapshot(querySnapshot => {
            // console.log('Total user: ', querySnapshot.size);
            const users = [];
            const modalDataUid = [];
            querySnapshot.forEach((documentSnapshot) => {
              console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
              users.push(documentSnapshot.data());
              modalDataUid.push(documentSnapshot.id);
            });
            setUsers(users)
            setModalDataUid(modalDataUid)
          })
        if (loading) {
          setLoading(false);
        }
      }
      // for Standar pacakge 
      else if (Package == 456) {
        await firestore()
          .collection('users')
          .where("userDetails.Gender", '==', "Male")
          .limit(3)
          .onSnapshot(querySnapshot => {
            // console.log('Total user: ', querySnapshot.size);
            const users = [];
            const modalDataUid = [];
            querySnapshot.forEach((documentSnapshot) => {
              // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
              users.push(documentSnapshot.data());
              modalDataUid.push(documentSnapshot.id);
            });
            setUsers(users)
            setModalDataUid(modalDataUid)
          })
        if (loading) {
          setLoading(false);
        }
      }
      // for premium package 
      else {
        await firestore()
          .collection('users')
          .where("userDetails.Gender", '==', "Male")
          .limit(4)
          .onSnapshot(querySnapshot => {
            // console.log('Total user: ', querySnapshot.size);
            const users = [];
            const modalDataUid = [];
            querySnapshot.forEach((documentSnapshot) => {
              // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
              users.push(documentSnapshot.data());
              modalDataUid.push(documentSnapshot.id);
            });
            setUsers(users)
            setModalDataUid(modalDataUid)
          })
        if (loading) {
          setLoading(false);
        }
      }
    }
    else {
      // try {
      // console.log('hello');
      await firestore()
        .collection('users')
        .where("userDetails.Gender", '==', "Male")
        .limit(1)
        .onSnapshot(querySnapshot => {
          // console.log('Total user: ', querySnapshot.size);
          const users = [];
          const modalDataUid = [];
          querySnapshot.forEach((documentSnapshot) => {
            // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            users.push(documentSnapshot.data());
            modalDataUid.push(documentSnapshot.id);
          });
          setUsers(users)
          setModalDataUid(modalDataUid)
        })
      if (loading) {
        setLoading(false);
      }
      // console.log('MaleUsers: ', users);

      // } catch (e) {
      //   console.log(e);
      // }
    }

  };


  const fetchFemaleUsers = async () => {
    if (!userPackage == '') {
      const Package = userPackage.id;
      console.log('female filter', Package);
      // for basic package 
      if (Package == 123) {
        await firestore()
          .collection('users')
          .where("userDetails.Gender", '==', "Female")
          .limit(2)
          .onSnapshot(querySnapshot => {
            // console.log('Total user: ', querySnapshot.size);
            const users = [];
            const modalDataUid = [];
            querySnapshot.forEach((documentSnapshot) => {
              // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
              users.push(documentSnapshot.data());
              modalDataUid.push(documentSnapshot.id);
            });
            setUsers(users)
            setModalDataUid(modalDataUid)
          })
        if (loading) {
          setLoading(false);
        }
        // console.log('FemaleUsers: ', users);
      }
      else if (Package == 456) {
        await firestore()
          .collection('users')
          .where("userDetails.Gender", '==', "Female")
          .limit(3)
          .onSnapshot(querySnapshot => {
            // console.log('Total user: ', querySnapshot.size);
            const users = [];
            const modalDataUid = [];
            querySnapshot.forEach((documentSnapshot) => {
              // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
              users.push(documentSnapshot.data());
              modalDataUid.push(documentSnapshot.id);
            });
            setUsers(users)
            setModalDataUid(modalDataUid)
          })
        if (loading) {
          setLoading(false);
        }
      }
      // for premium package 
      else {
        await firestore()
          .collection('users')
          .where("userDetails.Gender", '==', "Female")
          .limit(5)
          .onSnapshot(querySnapshot => {
            // console.log('Total user: ', querySnapshot.size);
            const users = [];
            const modalDataUid = [];
            querySnapshot.forEach((documentSnapshot) => {
              // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
              users.push(documentSnapshot.data());
              modalDataUid.push(documentSnapshot.id);
            });
            setUsers(users)
            setModalDataUid(modalDataUid)
          })
        if (loading) {
          setLoading(false);
        }
      }
    }
    else {
      try {
        await firestore()
          .collection('users')
          .where("userDetails.Gender", '==', "Female")
          .limit(1)
          .onSnapshot(querySnapshot => {
            // console.log('Total user: ', querySnapshot.size);
            const users = [];
            const modalDataUid = [];
            querySnapshot.forEach((documentSnapshot) => {
              // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
              users.push(documentSnapshot.data());
              modalDataUid.push(documentSnapshot.id);
            });
            setUsers(users)
            setModalDataUid(modalDataUid)
          })
        if (loading) {
          setLoading(false);
        }
        // console.log('FemaleUsers: ', users);

      } catch (e) {
        console.log(e);
      }
    };
  }

  const fetchCurrentUsers = async () => {
    try {
      const CurrentUData = [];
      firestore().collection('users').doc(CurrentUser).onSnapshot(documentSnapshot => {
        // console.log('Login User: ', documentSnapshot.data());
        CurrentUData.push(documentSnapshot.data());
      });
      setCurrentUserData(CurrentUData)
      // setCurrentUserData(CurrentuserData)
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    fetchusersMain();
    fetchCurrentUsers();


  }, [])

  // useEffect(() => {
  //   testfectch();
  //   // setModalVisible(!modalVisible);
  // }, [])

  const openSettingsModal = (cardIndex) => {
    setModalData(users[cardIndex]);
    setModalVisible(!modalVisible);
    // console.log('here is current card index',cardIndex);
    // cardData = cards[cardIndex]
    // console.log('modal data', users[cardIndex]);
  }

  const OpenForChating = (cardIndex) => {
    // console.log('Chating data', users[cardIndex]);
    const Data = users[cardIndex];
    const DataId = modalDataUid[cardIndex]
    SubmitChatUSer(Data, DataId)
    MatchUsers(Data, DataId)
    // SendToChatUSer(CurrentuserData, DataId);
    // navigation.navigate('Message')
  }

  const SubmitChatUSer = (Data, DataId) => {
    if (!Data == '') {
      const CurrentUser = auth().currentUser.uid;
      const postImg = Data.userDetails.postImg;
      const FirstName = Data.userDetails.FirstName;
      const Email = Data.userDetails.Email;
      const ContactNumber = Data.userDetails.ContactNumber;
      const Address = Data.userDetails.Address;
      const Religion = Data.userDetails.Religion;
      const Gender = Data.userDetails.Gender;
      const Age = Data.userDetails.Age;
      const Country = Data.userDetails.Country;
      const PostalCode = Data.userDetails.PostalCode;
      const Description = Data.userDetails.Description;
      const TimePeriod = Data.userDetails.TimePeriod;
      const AccountType = Data.userDetails.AccountType;
      const details = Data.userDetails.Details;
      firestore()
        .collection('users').doc(CurrentUser).update({
          PrivateChat: firestore.FieldValue.arrayUnion({
            ChatuserDetails: {
              uid: DataId,
              FirstName: FirstName,
              Email: Email,
              ContactNumber: ContactNumber,
              Address: Address,
              Religion: Religion,
              Gender: Gender,
              Age: Age,
              Country: Country,
              PostalCode: PostalCode,
              Description: Description,
              TimePeriod: TimePeriod,
              AccountType: AccountType,
              postImg: postImg,
              Details: details,
              // createdAt: firestore.FieldValue.serverTimestamp(),
            }
          }),
        })
        .then(() => {
          console.log('User updated!');
          // navigation.navigate('MessagesScreen')
          Notifictaions(
            Docuser = DataId,
            noticeStatus = 'Unread',
            tag = 'likes you',
            type = 'Swap',
            RequestStatus = 'Unaccepted',
            noticeID = CurrentUser,
            NoticeName = CurrentuserData[0].userDetails.FirstName,
          )
        });
    } else {
      console.log('card user not found!!');
    }
  }

  // const Docuser
  // const noticeStatus
  // const tag
  // const type
  // const RequestStatus
  // const noticeID
  // const NoticeName

  const MatchUsers = (Data, DataId) => {
    if (!DataId == '') {
      try {
        firestore().collection('users').doc(DataId).onSnapshot(docSnapshot => {
          if (docSnapshot.data()?.PrivateChat) {
            docSnapshot.data()?.PrivateChat.map(chats => {
              if (chats.ChatuserDetails.uid == CurrentUser) {
                // console.log('test');
                Notifictaions(
                  Docuser = CurrentUser,
                  noticeStatus = 'Unread',
                  tag = 'is your match founded',
                  type = 'Swap',
                  RequestStatus = 'Accepted',
                  noticeID = DataId,
                  NoticeName = Data.userDetails.FirstName,
                )
                Notifictaions(
                  Docuser = DataId,
                  noticeStatus = 'Unread',
                  tag = 'is your match founded',
                  type = 'Swap',
                  RequestStatus = 'Accepted',
                  noticeID = CurrentUser,
                  NoticeName = CurrentuserData[0].userDetails.FirstName,
                )
                // console.log('notices send both-hand');
              } else {
                console.log('no match found');
              }
            })
          } else {
            console.log('data not found');
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('Match not found');
    }
  };

  // const SentNotice = () => {
  //   try {
  //     const noticeStatus = 'Unread';
  //     const status = 'Want to lock you!';
  //     const type = 'swap';
  //     const RequestStatus = 'Unaccepted';
  //     firestore()
  //       .collection('notification').doc(CurrentUser).update({
  //         Notices: firestore.FieldValue.arrayUnion({
  //           noticeStatus: noticeStatus,
  //           status: status,
  //           type: type,
  //           requestStatus: RequestStatus,
  //           // timeStamp: firestore.FieldValue.serverTimestamp(),
  //         }),
  //       })
  //       .then(() => {
  //         console.log('Notices send!');
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // const SendToChatUSer = (CurrentuserData, DataId) => {
  //   if (!CurrentuserData == '') {
  //     const CurrentUser = auth().currentUser.uid;
  //     const ChatUSeid = DataId;
  //     const postImg = CurrentuserData[0].userDetails.postImg;
  //     const FirstName = CurrentuserData[0].userDetails.FirstName;
  //     const Email = CurrentuserData[0].userDetails.Email;
  //     const ContactNumber = CurrentuserData[0].userDetails.ContactNumber;
  //     const Address = CurrentuserData[0].userDetails.Address;
  //     const Religion = CurrentuserData[0].userDetails.Religion;
  //     const Gender = CurrentuserData[0].userDetails.Gender;
  //     const Age = CurrentuserData[0].userDetails.Age;
  //     const Country = CurrentuserData[0].userDetails.Country;
  //     const Description = CurrentuserData[0].userDetails.Description;
  //     const TimePeriod = CurrentuserData[0].userDetails.TimePeriod;
  //     const AccountType = CurrentuserData[0].userDetails.AccountType;
  //     firestore()
  //       .collection('users').doc(ChatUSeid).update({
  //         PrivateChat: firestore.FieldValue.arrayUnion({
  //           ChatuserDetails: {
  //             uid: CurrentUser,
  //             FirstName: FirstName,
  //             Email: Email,
  //             ContactNumber: ContactNumber,
  //             Address: Address,
  //             Religion: Religion,
  //             Gender: Gender,
  //             Age: Age,
  //             Country: Country,
  //             Description: Description,
  //             TimePeriod: TimePeriod,
  //             AccountType: AccountType,
  //             postImg: postImg,
  //             // createdAt: firestore.FieldValue.serverTimestamp(),
  //           }
  //         })
  //       })
  //       .then(() => {
  //         console.log('Currentuser added!');
  //       });
  //     // ToastAndroid.show('Welcome to Zaytoona', ToastAndroid.SHORT)
  //     // console.log('data save succsesfull');
  //   } else {
  //     console.log('current user not found!!');
  //   }
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCards([
  //       {
  //         id: '1',
  //         backgroundColor: COLORS.white,
  //         image: require('../../assets/user/girl1.jpg'),
  //         name: 'Fari',
  //         bio: 'Et ultrices amet lacus, vivamus tempor viverra odio tincidunt nulla convallis amet varius velit proin iaculis nisi fusce pharetra varius imperdiet mattis',
  //         Age: 24,
  //         Address: "Husainabad no3",
  //         Country: 'Karachi, Pakistan',
  //         Profession: 'Lawyer',
  //         account: 'Premium',
  //         // about
  //         height: '157cm (5.2)',
  //         Status: 'Never Married',
  //         MarrigeTime: 'Marriage with in year',
  //         // Religious
  //         Religious: 'Muslim',
  //         ReligiousType: 'Sunni',
  //         Food: 'Only easts halal',
  //         flag: require('../../assets/pakistan.png')
  //       },
  //       {
  //         id: '2',
  //         backgroundColor: COLORS.white,
  //         image: require('../../assets/user/girl2.jpg'),
  //         name: 'Mahnoor',
  //         Address: "Husainabad no3",
  //         bio: 'Et ultrices amet lacus, vivamus tempor viverra odio tincidunt nulla convallis amet varius velit proin iaculis nisi fusce pharetra varius imperdiet mattis',
  //         Age: 22,
  //         Country: 'Lahore, Pakistan',
  //         Profession: 'Lawyer',
  //         account: 'Normal',
  //         // about
  //         height: '157cm (5.1)',
  //         Status: 'Never Married',
  //         MarrigeTime: 'Marriage within a year',
  //         // Religious
  //         Religious: 'Muslim',
  //         ReligiousType: 'Sunni',
  //         Food: 'Only easts halal',
  //         flag: require('../../assets/australia.png'),
  //       },
  //       {
  //         id: '3',
  //         backgroundColor: COLORS.white,
  //         image: require('../../assets/user/girl3.jpg'),
  //         name: 'Urvashi',
  //         Address: "Husainabad no3",
  //         bio: 'Et ultrices amet lacus, vivamus tempor viverra odio tincidunt nulla convallis amet varius velit proin iaculis nisi fusce pharetra varius imperdiet mattis',
  //         Age: 24,
  //         Country: 'Karachi, Pakistan',
  //         account: 'Premium',
  //         Profession: 'Lawyer',
  //         // about
  //         height: '157cm (5.2)',
  //         Status: 'Never Married',
  //         MarrigeTime: 'Marriage within year',
  //         // Religious
  //         Religious: 'Non-Muslim',
  //         ReligiousType: 'Non-Muslim',
  //         Food: 'Only easts',
  //         flag: require('../../assets/india.png'),
  //       },
  //       {
  //         id: '4',
  //         backgroundColor: COLORS.white,
  //         image: require('../../assets/user/girl1.jpg'),
  //         Address: "Husainabad no3",
  //         name: 'Laiba',
  //         bio: 'Et ultrices amet lacus, vivamus tempor viverra odio tincidunt nulla convallis amet varius velit proin iaculis nisi fusce pharetra varius imperdiet mattis',
  //         Age: 24,
  //         Country: 'Lahore, Pakistan',
  //         Profession: 'Lawyer',
  //         account: 'Premium',
  //         // about
  //         height: '157cm (5.0)',
  //         Status: 'Never Married',
  //         MarrigeTime: 'Marriage within year',
  //         // Religious
  //         Religious: 'Muslim',
  //         ReligiousType: 'Sunni',
  //         Food: 'Only easts halal',
  //         flag: require('../../assets/pakistan.png'),
  //       },
  //       {
  //         id: '5',
  //         backgroundColor: COLORS.white,
  //         image: require('../../assets/user/girl2.jpg'),
  //         name: 'Zainab',
  //         bio: 'Et ultrices amet lacus, vivamus tempor viverra odio tincidunt nulla convallis amet varius velit proin iaculis nisi fusce pharetra varius imperdiet mattis',
  //         Age: 24,
  //         Address: "Husainabad no3",
  //         Country: 'Karachi, Pakistan',
  //         Profession: 'Lawyer',
  //         account: 'Normal',
  //         // about
  //         height: '157cm (5.2)',
  //         Status: 'Never Married',
  //         MarrigeTime: 'Marriage within year',
  //         // Religious
  //         Religious: 'Muslim',
  //         ReligiousType: 'Sunni',
  //         Food: 'Only easts Halal',
  //         flag: require('../../assets/australia.png'),
  //       },
  //     ]);
  //   }, 3000);
  // }, []);


  const onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }

  const onSwipedAllCards = () => {
    setswipedAllCards(true)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.main} />
      {/* <HeaderOne3 icon="menu-open" /> */}

      {modalData && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{ marginTop: 0 }}>
            <ScrollView vertical showsVerticalScrollIndicator={false}>
              <View>
                <ImageBackground
                  source={{ uri: modalData.userDetails.postImg }}
                  resizeMode='cover' style={{
                    width: width,
                    height: 450,
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={{
                      flexDirection: 'column',
                      paddingHorizontal: 20,
                      alignItems: 'flex-end',
                      marginTop: 10,
                      flex: 1
                    }}>
                    <Image source={require('../../assets/arrowleft.png')} resizeMode='contain' style={{
                      tintColor: COLORS.white,
                      width: 20,
                      height: 20
                    }} />
                  </TouchableOpacity>
                  <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    justifyContent: 'flex-end',
                    marginBottom: 50,
                  }}>

                    <View style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      paddingTop: 20,
                    }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                          color: COLORS.white,
                          fontSize: 24,
                          fontWeight: 'bold',
                          paddingRight: 10,
                        }}>{modalData.userDetails.FirstName}</Text>
                        <Text style={{ fontSize: 20, color: COLORS.white, }}>{modalData.userDetails.Age}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../assets/pakistan.png')} style={{
                          resizeMode: 'contain',
                          width: 20,
                          height: 20,
                          elevation: 3,
                          marginRight: 2,
                        }} />
                        <Text style={{ color: COLORS.white, paddingVertical: 5, letterSpacing: 1 }}>{modalData.userDetails.Country}</Text>
                      </View>
                      <View style={{
                        flexDirection: 'row',
                        paddingVertical: 5,
                      }}>
                        <TouchableOpacity style={{
                          backgroundColor: COLORS.yellow,
                          padding: 5,
                          borderRadius: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                          <Ionicon name="user-o" size={15} color={COLORS.white} style={{
                            paddingRight: 5
                          }} />
                          <Text style={{ color: COLORS.white }}>{modalData.userDetails.AccountType}</Text>
                        </TouchableOpacity>
                        <Text style={{ padding: 5, color: COLORS.white }}>|</Text>
                        <View style={{
                          padding: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                          <Icon name="briefcase-outline" size={15} color={COLORS.white} style={{
                            paddingRight: 5
                          }} />
                          <Text style={{ color: COLORS.white }}>{modalData.userDetails.Description}</Text>
                        </View>
                        <Text style={{ padding: 5, color: COLORS.white }}>|</Text>
                        <View style={{
                          padding: 5,
                        }}>
                          <Text style={{ color: COLORS.white }}>{modalData.userDetails.Country}</Text>
                        </View>
                      </View>
                    </View>

                  </View>
                </ImageBackground>
              </View>
              <View>
                <View style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <View style={{
                      backgroundColor: COLORS.main,
                      padding: 8,
                      borderRadius: 10,
                    }}>
                      <Image source={require('../../assets/bio.png')} resizeMode='contain' style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.white
                      }} />
                    </View>
                    <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>Bio</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: width,
                  }}>
                    <View style={{ width: '85%' }}>
                      <Text style={{ paddingVertical: 10, }}>
                        {modalData.userDetails.Details}
                      </Text>
                    </View>
                    {/* <TouchableOpacity style={{ width: '25%' }}>
                      <Image source={require('../../assets/like2.png')} resizeMode='contain' />
                    </TouchableOpacity> */}
                  </View>
                </View>

                <View>
                  <View style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 10,
                    }}>
                      <View style={{
                        backgroundColor: COLORS.main,
                        padding: 8,
                        borderRadius: 10,
                      }}>
                        <Image source={require('../../assets/address.png')} resizeMode='contain' style={{
                          width: 15,
                          height: 15,
                          tintColor: COLORS.white
                        }} />
                      </View>
                      <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                        {modalData.userDetails.Address}
                      </Text>
                    </View>
                    {/* <View>
                      <Image source={require('../../assets/hello.png')} resizeMode='contain' />
                    </View> */}
                  </View>
                  <View>
                    <Image source={{ uri: modalData.userDetails.postImg }} resizeMode='cover' style={{
                      width: width,
                      height: 250,
                      borderRadius: 20,
                    }} />
                    {/* <TouchableOpacity style={{
                      paddingHorizontal: 20,
                      alignItems: 'flex-end',
                      marginTop: -65,
                      flex: 1
                    }}>
                      <Image source={require('../../assets/like2.png')} resizeMode='contain' />
                    </TouchableOpacity> */}
                  </View>
                </View>

                <View>
                  <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <View style={{
                      backgroundColor: COLORS.main,
                      padding: 8,
                      borderRadius: 10,
                    }}>
                      <Image source={require('../../assets/info.png')} resizeMode='contain' style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.white
                      }} />
                    </View>
                    <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                      {modalData.userDetails.FirstName}'s info
                    </Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginHorizontal: 20,
                    alignItems: 'center',
                    // backgroundColor: '#ccc'
                  }}>
                    <TouchableOpacity style={{
                      width: '40%',
                      height: 40,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: COLORS.light,
                      borderRadius: 30,
                      marginRight: 5,
                    }}>
                      <View>
                        <Image source={require('../../assets/like2.png')} resizeMode='contain'
                          style={{
                            height: 40,
                            width: 40
                          }} />
                      </View>
                      <View>
                        <Text style={{ fontSize: 12 }}>Single</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      width: '40%',
                      height: 40,
                      paddingHorizontal: 8,
                      marginRight: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: COLORS.light,
                      borderRadius: 30,
                    }}>
                      <View>
                        <Image source={require('../../assets/info4.png')} resizeMode='contain'
                          style={{
                            height: 20,
                            width: 20,
                            marginRight: 5,
                          }} />
                      </View>
                      <View>
                        <Text style={{ fontSize: 12 }}>{modalData.userDetails.Description}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      width: '40%',
                      height: 40,
                      marginRight: 5,
                      flexDirection: 'row',
                      paddingHorizontal: 8,
                      alignItems: 'center',
                      backgroundColor: COLORS.light,
                      borderRadius: 30,
                    }}>
                      <View>
                        <Image source={require('../../assets/info3.png')} resizeMode='contain'
                          style={{
                            height: 20,
                            width: 20,
                            marginRight: 5,
                          }} />
                      </View>
                      <View>
                        <Text style={{ fontSize: 12 }}>Height, {modalData.userDetails.Height}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      marginTop: 10,
                      width: '40%',
                      height: 40,
                      flexDirection: 'row',
                      marginRight: 5,
                      paddingHorizontal: 8,
                      alignItems: 'center',
                      backgroundColor: COLORS.light,
                      borderRadius: 30,
                    }}>
                      <View>
                        <Image source={require('../../assets/info8.png')} resizeMode='contain'
                          style={{
                            height: 20,
                            width: 20,
                            marginRight: 5,
                          }} />
                      </View>
                      <View>
                        <Text style={{ fontSize: 12 }}>Unmarried</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      width: '50%',
                      height: 40,
                      marginRight: 5,
                      flexDirection: 'row',
                      paddingHorizontal: 8,
                      alignItems: 'center',
                      backgroundColor: COLORS.light,
                      borderRadius: 30,
                    }}>
                      <View>
                        <Image source={require('../../assets/info7.png')} resizeMode='contain'
                          style={{
                            height: 20,
                            width: 20,
                            marginRight: 5,
                          }} />
                      </View>
                      <View>
                        <Text style={{ fontSize: 12 }}>Married within {modalData.userDetails.TimePeriod}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      width: '40%',
                      height: 40,
                      marginRight: 5,
                      flexDirection: 'row',
                      paddingHorizontal: 8,
                      alignItems: 'center',
                      backgroundColor: COLORS.light,
                      borderRadius: 30,
                    }}>
                      <View>
                        <Image source={require('../../assets/info6.png')} resizeMode='contain'
                          style={{
                            height: 20,
                            width: 20,
                            marginRight: 5,
                          }} />
                      </View>
                      <View>
                        <Text style={{ fontSize: 12 }}>Only eats halal</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                      width: '50%',
                      height: 40,
                      marginRight: 5,
                      flexDirection: 'row',
                      paddingHorizontal: 8,
                      alignItems: 'center',
                      backgroundColor: COLORS.light,
                      borderRadius: 30,
                      marginTop: 10
                    }}>
                      <View>
                        <Image source={require('../../assets/info9.png')} resizeMode='contain'
                          style={{
                            height: 20,
                            width: 20,
                            marginRight: 5,
                          }} />
                      </View>
                      <View>
                        <Text style={{ fontSize: 12 }}>{modalData.userDetails.Religion}, {modalData.userDetails.Religion}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <View style={{
                        backgroundColor: COLORS.main,
                        padding: 8,
                        borderRadius: 10,
                      }}>
                        <Image source={require('../../assets/gallery.png')} resizeMode='contain' style={{
                          tintColor: COLORS.white,
                          width: 15,
                          height: 15,
                        }} />
                      </View>
                      <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                        Gallery
                      </Text>
                    </View>
                    {/* <Text style={{ paddingHorizontal: 10, color: COLORS.black, }}>
                      See all
                    </Text> */}
                  </View>

                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{
                      flexDirection: 'row',
                      paddingHorizontal: 20,
                    }}>
                      <Image source={{ uri: modalData.userDetails.postImg }} resizeMode='cover' style={{
                        width: 250,
                        height: 150,
                        borderRadius: 20,
                        marginRight: 10,
                      }} />
                      <Image source={{ uri: modalData.userDetails.postImg }} resizeMode='contain' style={{
                        width: 250,
                        height: 150,
                        borderRadius: 20,
                        marginRight: 10,
                      }} />
                    </View>
                  </ScrollView>
                </View>

                <View style={{
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                }}>
                  <View>
                    <Text style={{ fontWeight: 'bold' }}>
                      Verification
                    </Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                    <View style={{
                      padding: 8,
                      backgroundColor: COLORS.main,
                      borderRadius: 30,
                    }}>
                      <Image source={require('../../assets/tick.png')} resizeMode='contain' style={{
                        width: 10,
                        height: 10,
                        tintColor: COLORS.white
                      }} />
                    </View>
                    <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                      {modalData.userDetails.FirstName}’s is photo-verified
                    </Text>
                  </View>
                </View>

              </View>
            </ScrollView>

          </View>
        </Modal >
      )}


      <View style={styles.container}>
        {users ? (
          <Swiper
            // ref={swiper => {
            //   swiper = swiper
            // }}
            onSwiped={() => onSwiped('general')}
            onSwipedLeft={() => onSwiped('left')}
            // onSwipedRight={() => onSwiped('right')}
            onSwipedRight={(cardIndex) => {
              OpenForChating(cardIndex);
            }}
            disableTopSwipe={true}
            disableBottomSwipe={true}
            onSwipedTop={() => onSwiped('top')}
            onSwipedBottom={() => onSwiped('bottom')}
            cards={users}
            renderCard={(cards) => <RenderCard data={cards} />}
            cardIndex={0}
            // onTapCard={(cards) => openSettingsModal(cards) }
            onTapCard={(cardIndex) => {
              openSettingsModal(cardIndex);
            }}
            // cardVerticalMargin={30}
            onSwipedAll={onSwipedAllCards}
            stackSize={3}
            stackSeparation={25}
            overlayLabels={{
              bottom: {
                title: 'BLEAH',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    borderWidth: 1
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                }
              },
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    borderWidth: 1
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30
                  }
                }
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: 'red',
                    borderColor: 'red',
                    color: 'white',
                    borderWidth: 1
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30
                  }
                }
              },
              top: {
                title: 'SUPER LIKE',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    borderWidth: 1
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                }
              }
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
          >
          </Swiper>
        ) : (
          <StatusCard text="Loading..." />
        )}
      </View>
    </SafeAreaView >
  )
}

export default SwapScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignContent: 'center',
    // justifyContent: 'center',
    width: width,
    marginTop: -59,
    marginLeft: -20,
  },
  card: {
    width: width,
    height: height,
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent'
  }
})