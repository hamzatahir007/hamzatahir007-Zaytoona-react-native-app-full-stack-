import { Modal, StyleSheet, Text, View, Pressable, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, LogBox } from 'react-native';
import React, { useState, useEffect } from 'react';
import COLORS from '../../consts/Colors';
import HeaderOne3 from '../components/HeaderOne3';
import Icon from 'react-native-vector-icons/Feather';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconicon from 'react-native-vector-icons/MaterialIcons';
import { Searchbar, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Slides from '../../consts/Slides'

const SearchScreen = () => {
    const [time, setTime] = useState('');
    const [age, setAge] = useState('');
    const [country, setCountry] = useState('');
    const [marrigetime, setMarrigeTime] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [usersMaster, setUsersMaster] = useState([]);
    const [deleted, setDeleted] = useState(false);

    const [userImage, setUserImage] = useState([]);

    const fetchPosts = async () => {
        try {
            // const list = [];
            // const users = await firestore().collection('Users').get();

            await firestore()
                .collection('users')
                .get()
                .then(querySnapshot => {
                    console.log('Total user: ',  querySnapshot.size);
                    const users = []
                    querySnapshot.forEach((documentSnapshot) => {
                        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                        users.push(documentSnapshot.data());
                        // const {
                        //     FirstName,
                        //     Email,
                        //     ContactNumber,
                        //     Address,
                        //     Religion,
                        //     Gender,
                        //     Age,
                        //     Country,
                        //     PostalCode,
                        //     Description,
                        //     TimePeriod,
                        //     AccountType,
                        //     postImg,
                        // } = documentSnapshot.data();
                        // users.push({
                        //     id: documentSnapshot.id,
                        //     FirstName,
                        //     Email,
                        //     ContactNumber,
                        //     Address,
                        //     Religion,
                        //     Gender,
                        //     Age,
                        //     Country,
                        //     PostalCode,
                        //     Description,
                        //     TimePeriod,
                        //     AccountType,
                        //     postImg,
                        // });
                    });
                    setUsers(users)
                })
            // setUsers(users);
            if (loading) {
                setLoading(false);
            }

            console.log('Users: ', users);
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        fetchPosts();
    }, [])

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            const newData = usersMaster.filter((item) => {
                const itemData = item.FirstName ? item.FirstName.toUpperCase()
                    : ''.toUpperCase();
                const itemDataCountry = item.Country ? item.Country.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            // setFilteredDataSource(newData);
            setUsers(newData);
            setSearchQuery(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setUsers(usersMaster);
            setSearchQuery(text);
        }
    };


    const searchCountry = () => {
        // console.log(country);
        if (country) {
            const newData = usersMaster.filter((item) => {
                const itemData = item.Country ? item.Country.toUpperCase() : ''.toUpperCase();
                console.log(itemData);

                // const itemData2 = item.TimePeriod ? item.TimePeriod : 'no age found';
                // console.log(itemData2);

                const textData = country.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            console.log(newData)
            setUsers(newData);
            setCountry(country);
            setModalVisible(false)
        } else {
            setUsers(usersMaster);
            setCountry(country);
            // setCountry(text);
            setModalVisible(false)
            setAge('')
            setTime('')
        }
    };



    const checkoutModalContent = () => {
        return (
            <>
                <View style={styles.modalContainer}>
                    <View style={styles.modalCheckoutContainer}>
                        <Text style={styles.restaurantName}>Search For Country</Text>

                        <View>

                            <TextInput
                                label="Search or filter"
                                value={country}
                                onChangeText={text => setCountry(text)}
                                activeUnderlineColor={COLORS.main}
                                placeholderTextColor={COLORS.main}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 30,
                        }}>
                            <TouchableOpacity onPress={searchCountry} style={{
                                backgroundColor: COLORS.main,
                                borderRadius: 30,
                                padding: 13,
                                width: 300,
                                alignItems: 'center',
                                marginTop: 10,
                            }}>
                                <Text style={{
                                    color: 'white',
                                }}>Search</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.main} />
            <HeaderOne3 icon="menu-open" />

            {/* Model starts here for country */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                {checkoutModalContent()}

            </Modal>
            {/* modal end here  */}


            <View style={{ paddingHorizontal: 10, paddingTop: 5, }}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={text => searchFilterFunction(text)}
                    value={searchQuery}
                    style={styles.searchbar}
                    icon={({ size, color }) => (
                        <Icon name="search" size={24} color />
                    )}
                    clearIcon={({ size, color }) => (
                        <Icons name="filter" size={24} color onPress={text => searchFilterFunction('')} />
                    )}
                />

            </View>

            <View style={{
                paddingHorizontal: 10,
                paddingTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Pressable style={{
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                    flex: 1,
                    marginHorizontal: 4,
                    borderRadius: 5,
                    elevation: 3,
                    backgroundColor: COLORS.white,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                    onPress={() => setModalVisible(true)}
                >
                    <View style={{
                        width: '30%',
                        alignItems: 'center',
                    }}>
                        <Iconn name="human-male-height" size={20}
                            color={COLORS.black} />
                    </View>
                    <Text style={{
                        width: '70%',
                        fontSize: 18,
                        color: COLORS.black,
                        marginLeft: 5,
                        alignItems: 'center'
                    }}>Age</Text>
                </Pressable>

                <Pressable style={{
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                    flex: 1,
                    marginHorizontal: 4,
                    borderRadius: 5,
                    elevation: 3,
                    backgroundColor: COLORS.white,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                    onPress={() => setModalVisible(true)}
                >
                    <View style={{
                        width: '30%',
                        alignItems: 'center',
                    }}>
                        <Fontisto name="world-o" size={20}
                            color={COLORS.black} />
                    </View>
                    <Text style={{
                        width: '70%',
                        fontSize: 18,
                        color: COLORS.black,
                        marginLeft: 5,

                        alignItems: 'center'
                    }}>Country</Text>
                </Pressable>

                <Pressable style={{
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                    flex: 1,
                    marginHorizontal: 4,
                    borderRadius: 5,
                    elevation: 3,
                    backgroundColor: COLORS.white,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                    onPress={() => setModalVisible(true)}
                >
                    <View style={{
                        width: '30%',
                        alignItems: 'center',
                    }}>
                        <Iconn name="ring" size={20}
                            color={COLORS.black} />
                    </View>
                    <Text style={{
                        width: '70%',
                        fontSize: 18,
                        color: COLORS.black,
                        marginLeft: 5,
                    }}>Time</Text>
                </Pressable>
            </View>


            <View style={{ flex: 1, paddingBottom:60 }}>
                <FlatList
                    style={{
                        height: '100%'
                    }}
                    data={users}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={{ width: '30%', height: 120, }}>
                                <Image source={{ uri: item.userDetails.postImg }} style={{
                                    width: '90%',
                                    height: 120,
                                    borderRadius: 5,
                                    resizeMode: 'cover',
                                }} />
                            </View>
                            <View style={{ width: '70%', height: 120, }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',

                                }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                    }}>{item.userDetails.FirstName}
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icons name="ios-reload" size={15}
                                            color={COLORS.black} />
                                        <Text>{item.userDetails.Age}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                }}>
                                    <Text style={{ color: COLORS.main, }}>{item.userDetails.Description}, </Text>
                                    <Text style={{ color: COLORS.main, }}>{item.userDetails.Country}</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    // color: COLORS.gray2,
                                    marginTop: 15,
                                }}>
                                    <Iconicon name="data-usage" size={20}
                                        color={COLORS.gray2} style={{ marginRight: 5 }} />
                                    <Text style={{ color: COLORS.gray2, }}>{item.userDetails.Address}, </Text>
                                    <Text style={{ color: COLORS.gray2, }}>{item.userDetails.Gender}, </Text>
                                    <Text style={{ color: COLORS.gray2, }}>{item.userDetails.Religion}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    // color: COLORS.gray2,
                                    width: 80,
                                    marginTop: 5,
                                }}>
                                    <Iconicon name="access-time" size={20}
                                        color={COLORS.gray2} style={{ marginRight: 5 }} />
                                    <Text style={{ color: COLORS.gray2, }}>{item.userDetails.TimePeriod} </Text>
                                </View>
                            </View>
                        </View>

                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray2,
        padding: 15,
        margin: 5,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    itemHeading: {
        fontWeight: 'bold',
    },
    itemText: {
        fontWeight: '300'
    },
    card: {
        flexDirection: 'row',
        height: 150,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        borderRadius: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgb(0,0,0,1)',
    },
    modalCheckoutContainer: {
        backgroundColor: 'white',
        padding: 16,
        height: 300,
        boderWidth: 1,
    },
    restaurantName: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18,
        marginBottom: 10,
    },
    modalSubtotalContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    subTotalText: {
        textAlign: 'left',
        fontWeight: "600",
        fontSize: 15,
        marginBottom: 10,
    },

})