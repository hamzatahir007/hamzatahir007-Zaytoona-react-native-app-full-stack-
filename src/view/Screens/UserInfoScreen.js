import { TouchableOpacity, SafeAreaView, ScrollView, ToastAndroid, StatusBar, StyleSheet, Text, View, Button, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import HeaderOne2 from '../components/HeaderOne2';
import COLORS from '../../consts/Colors';
import { TextInput, List } from 'react-native-paper';
import FirebaseSetup from '../../../config';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { log } from 'react-native-reanimated';
import { login } from '../../../redux/reducers/Reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInfoScreen = ({ navigation }) => {
    const [firstName, setFirstName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [contactNumber, setContactNumer] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [religion, setReligion] = React.useState('Muslim');
    const [selectedReligion, setSelectedReligion] = useState();
    const [gender, setGender] = React.useState('Male');
    const [age, setAge] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [marrigeStatus, setMarrigeStatus] = React.useState('Unmarried');
    const [food, setfood] = React.useState('Halal Food');
    const [postalCode, setPostalCode] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [timePeriod, setTimePeriod] = useState('1year');
    const [accountType, setAccountType] = React.useState('Normal');
    const [transferred, setTransferred] = useState(0);
    const [details, setDetails] = React.useState('');


    // const { control, handleSubmit, watch } = useForm();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);


    const [inputfirstName, setInputFirstName] = React.useState(false);
    const [inputemail, setInputEmail] = React.useState(false);
    const [inputcontactNumber, setInputContactNumer] = React.useState(false);
    const [inputaddress, setInputAddress] = React.useState(false);
    const [inputreligion, setInputReligion] = React.useState(false);
    const [inputgender, setInputGender] = React.useState(false);
    const [inputage, setInputAge] = React.useState(false);
    const [inputheight, setInputHeight] = React.useState(false);
    const [inputcountry, setInputCountry] = React.useState(false);
    const [inputFood, setInputFood] = React.useState(false);
    const [inputMarrigeStatus, setInputMarrigeStatus] = React.useState(false);
    const [inputpostalCode, setInputPostalCode] = React.useState(false);
    const [inputdescription, setInputDescription] = React.useState(false);
    const [inputTimePeriod, setInputTimePeriod] = React.useState(false);
    const [inputAccountType, setInputAccountType] = React.useState(false);
    const [inputdetails, setInputDetails] = React.useState(false);

    const dispatch = useDispatch();

    const { auth } = FirebaseSetup();


    const AddToRedux = (imageUrl) => {

        var Data = new Object();

        Data.FirstName = firstName;
        Data.email = email;
        Data.contactNumber = contactNumber;
        Data.address = address;
        Data.religion = religion;
        Data.gender = gender;
        Data.age = age;
        Data.height = height;
        Data.country = country;
        Data.marrigeStatus = marrigeStatus;
        Data.food = food;
        Data.postalCode = postalCode;
        Data.description = description;
        Data.timePeriod = timePeriod;
        Data.accountType = accountType;
        Data.image = imageUrl;
        Data.details = details;

        // console.log('test data: ',Data);
        dispatch(login(Data))
    };

    const OnSubmitInfo = async () => {
        try {
            setUploading(true)
            const imageUrl = await uploadImage();
            const CurrentUser = auth().currentUser.uid;
            // return;

            firestore()
                .collection('users').doc(CurrentUser).set({
                    userDetails: {
                        uid: CurrentUser,
                        FirstName: firstName,
                        Email: email,
                        ContactNumber: contactNumber,
                        Address: address,
                        Religion: religion,
                        Gender: gender,
                        Age: age,
                        Height: height,
                        Country: country,
                        Food: food,
                        PostalCode: postalCode,
                        Status: marrigeStatus,
                        Description: description,
                        TimePeriod: timePeriod,
                        AccountType: accountType,
                        postImg: imageUrl,
                        UserLock: false,
                        Details: details,
                        // createdAt: firestore.FieldValue.serverTimestamp(),
                    }
                });

            // redux
            AddToRedux(imageUrl);

            setImage(null)
            ToastAndroid.show('Welcome to Zaytoona', ToastAndroid.SHORT)
            setUploading(false)
        } catch (error) {
            console.log(error);
        }
        
    }

    const uploadImage = async () => {
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        // setUploading(true);
        // setTransferred(0);

        const storageRef = storage().ref(`Users/${filename}`);
        const task = storageRef.putFile(uploadUri);

        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });

        try {
            await task;

            const url = await storageRef.getDownloadURL();

            // setUploading(false);
            setImage(null);

            // Alert.alert(
            //   'Image uploaded!',
            //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
            // );
            return url;

        } catch (e) {
            console.log(e);
            return null;
        }

    };


    const regex = new RegExp("\\+\\d+$");
    const EMAIL_REGEX = /@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    const OnhandleSubmit = () => {
        console.log(
            firstName,
            email,
            contactNumber,
            address,
            religion,
            gender,
            age,
            height,
            country,
            marrigeStatus,
            food,
            postalCode,
            description,
            timePeriod,
            accountType,
            image,
            details
        );
        // return;
        // if (firstName == '' || email == '' || contactNumber == '' || address == '' || religion == '' || gender == '' || age == '' || country == '' || postalCode == '') {
        if (firstName == '' || firstName.length < 3 || firstName == isNaN) {
            ToastAndroid.show('Please enter your First name', ToastAndroid.SHORT)
            setInputFirstName(true)
        }
        else if (email === '' || !email === EMAIL_REGEX.test(email)) {
            ToastAndroid.show('Invalid Email Format', ToastAndroid.SHORT)
            setInputEmail(true)
        }
        else if (contactNumber == '' || contactNumber.length < 11 || contactNumber == isNaN || !contactNumber === regex.test(contactNumber)) {
            ToastAndroid.show('phone number should be 11 digits and start with +', ToastAndroid.SHORT)
            setInputContactNumer(true)
        }
        else if (address == '' || address.length < 3 || address == isNaN) {
            ToastAndroid.show('Address is Required', ToastAndroid.SHORT)
            setInputAddress(true)
        }
        else if (religion == '' || religion == isNaN) {
            ToastAndroid.show('Please enter your Religion', ToastAndroid.SHORT)
            setInputReligion(true)
        }
        else if (gender == '' || gender.length < 3 || gender == isNaN) {
            ToastAndroid.show('Please enter your Gender', ToastAndroid.SHORT)
            setInputGender(true)
        }
        else if (age == '' || age < 12 || age == isNaN) {
            ToastAndroid.show('Please enter your Age', ToastAndroid.SHORT)
            setInputAge(true)
        }
        else if (height == '' || height < 1 || height == isNaN) {
            ToastAndroid.show('Please enter your Height', ToastAndroid.SHORT)
            setInputHeight(true)
        }
        else if (country == '' || country.length < 3 || country == isNaN) {
            ToastAndroid.show('Please enter your Country', ToastAndroid.SHORT)
            setInputCountry(true)
        }
        else if (food == '' || food == isNaN) {
            ToastAndroid.show('Please enter your Food', ToastAndroid.SHORT)
            setInputFood(true)
        }
        else if (marrigeStatus == '' || marrigeStatus == isNaN) {
            ToastAndroid.show('Please enter select your Status', ToastAndroid.SHORT)
            setInputMarrigeStatus(true)
        }
        else if (postalCode == '' || postalCode.length < 3 || postalCode == isNaN) {
            ToastAndroid.show('Please enter your PostalCode', ToastAndroid.SHORT)
            setInputPostalCode(true)
        }
        else if (description == '' || description == isNaN) {
            ToastAndroid.show('Please enter your description', ToastAndroid.SHORT)
            setInputDescription(true)
        }
        else if (timePeriod == '' || timePeriod == isNaN) {
            ToastAndroid.show('Please enter select Marry TimePeriod', ToastAndroid.SHORT)
            setInputTimePeriod(true)
        }
        else if (accountType == '' || accountType == isNaN) {
            ToastAndroid.show('Please enter select accountType', ToastAndroid.SHORT)
            setInputAccountType(true)
        }
        else if (image == '' || image == null) {
            ToastAndroid.show('Image cannot be empty', ToastAndroid.SHORT)
        }
        else if (details == '' || details == null) {
            ToastAndroid.show('Details cannot be empty', ToastAndroid.SHORT)
        }
        // setInputFirstName(true)
        // setInputEmail(true)
        // setInputContactNumer(true)
        // setInputAddress(true)
        // setInputReligion(true)
        // setInputGender(true)
        // setInputAge(true)
        // setInputCountry(true)
        // setInputPostalCode(true)
        // setInputDescription(true)
        // }
        else {
            setInputFirstName(false);
            setInputEmail(false);
            setInputContactNumer(false);
            setInputAddress(false);
            setInputReligion(false);
            setInputGender(false);
            setInputAge(false);
            setInputHeight(false);
            setInputCountry(false);
            setInputFood(false);
            setInputMarrigeStatus(false);
            setInputPostalCode(false);
            setInputDescription(false);
            setInputTimePeriod(false);
            setInputAccountType(false);
            setInputDetails(false);

            // let formData = new FormData();    //formdata object

            // formData.append('name', firstName);
            // formData.append('email', email);
            // formData.append('contactNumber', contactNumber);
            // formData.append('address', address);
            // formData.append('religion', religion);
            // formData.append('gender', gender);
            // formData.append('age', age);
            // formData.append('country', country);
            // formData.append('postalCode', postalCode);
            // formData.append('description', description);

            OnSubmitInfo();


            // ToastAndroid.show('Phone number Verified', ToastAndroid.SHORT)
        }
    };



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await launchImageLibrary({
            mediaType: 'photo',
            saveToPhotos: true,
        });
        setImage(result.assets[0].uri);
    };

    // const uploadImage = async () => {
    //     if (image == "") {
    //         setToastMsg("Image cannot be empty");
    //         return false;
    //     }
    //     else {
    //         try {
    //             // setLoading(true);
    //             const CurrentUser = auth().currentUser;
    //             const vehicleReferenceFront = storage().ref(vehiclePicFront);
    //             const vehicleReferenceBack = storage().ref(vehiclePicBack);
    //             const vehicleReferenceNumPlate = storage().ref(vehicleNumPlatePic);
    //             await vehicleReferenceFront.putFile(vehiclePicFront);
    //             await vehicleReferenceBack.putFile(vehiclePicBack);
    //             await vehicleReferenceNumPlate.putFile(vehicleNumPlatePic);
    //             firestore()
    //                 .collection('Drivers')
    //                 .doc(CurrentUser.uid)
    //                 .update({
    //                     vehicleDetails: {
    //                         vehicleName: vehicleName,
    //                         vehicleModel: vehicleModel,
    //                         vehicleNumPlate: vehicleNumPlate,
    //                         vehicleCategory: vehicleCategory,
    //                         vehiclePicFront: vehiclePicFront,
    //                         vehiclePicBack: vehiclePicBack,
    //                         vehicleNumPlatePic: vehicleNumPlatePic,
    //                     }
    //                 })
    //                 .then(() => {
    //                     console.log('User added!');
    //                 });
    //             // setLoading(false);
    //             // navigation.navigate('DriverHomeScreen')
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    // }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.main} />
            <HeaderOne2 />
            <View style={{ height: '80%', }}>
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: COLORS.pink
                    }}>
                        STEP - 1
                    </Text>
                </View>
                <ScrollView>

                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>First Name</Text>

                        <TextInput
                            // label={'First Name'}
                            textColor={COLORS.gray}
                            value={firstName}
                            // placeholder={'First Name'}
                            error={inputfirstName}
                            keyboardType='text'
                            onFocus={() => setInputFirstName(false)}
                            placeholderTextColor={COLORS.black}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            height={200}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={firstName => setFirstName(firstName)
                            }
                            style={styles.TextInput}
                        />
                    </View>


                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>E-mail</Text>
                        <TextInput
                            // label={'First Name'}
                            error={inputemail}
                            keyboardType='emial'
                            onFocus={() => setInputEmail(false)}
                            textColor={COLORS.gray}
                            value={email}
                            // placeholder={'First Name'}
                            placeholderTextColor={COLORS.gray}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={email => setEmail(email)
                            }
                            style={styles.TextInput}
                        />
                    </View>

                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Contact Number</Text>
                        <TextInput
                            // label={'First Name'}
                            error={inputcontactNumber}
                            autoComplete='tel'
                            keyboardType='phone-pad'
                            onFocus={() => setInputContactNumer(false)}
                            textColor={COLORS.gray}
                            value={contactNumber}
                            // placeholder={'First Name'}
                            placeholderTextColor={COLORS.gray}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={contactNumber => setContactNumer(contactNumber)
                            }
                            style={styles.TextInput}
                        />
                    </View>

                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Address</Text>
                        <TextInput
                            // label={'First Name'}
                            error={inputaddress}
                            keyboardType='text'
                            onFocus={() => setInputAddress(false)}
                            textColor={COLORS.gray}
                            value={address}
                            // placeholder={'First Name'}
                            placeholderTextColor={COLORS.gray}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={address => setAddress(address)
                            }
                            style={styles.TextInput}
                        />
                    </View>

                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Religion</Text>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.pink,
                            height: 40,
                        }}>
                            <Picker
                                selectedValue={religion}
                                onValueChange={(itemValue, itemIndex) =>
                                    setReligion(itemValue)
                                }
                                style={{
                                    color: COLORS.gray,
                                    height: 35,
                                }}>
                                <Picker.Item label="Muslim" value="Muslim" />
                                <Picker.Item label="Nonmuslim" value="Nonmuslim" />
                            </Picker>
                        </View>
                        {/* <TextInput
                            // label={'First Name'}
                            error={inputreligion}
                            keyboardType='text'
                            onFocus={() => setInputReligion(false)}
                            textColor={COLORS.gray}
                            value={religion}
                            // placeholder={'First Name'}
                            placeholderTextColor={COLORS.gray}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={religion => setReligion(religion)
                            }
                            style={styles.TextInput}
                        /> */}
                    </View>

                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Gender</Text>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.pink,
                            height: 40,
                        }}>
                            <Picker
                                selectedValue={gender}
                                onValueChange={(itemValue, itemIndex) =>
                                    setGender(itemValue)
                                }
                                style={{
                                    color: COLORS.gray,
                                    height: 35,
                                }}>
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                        </View>
                        {/* <TextInput
                            // label={'First Name'}
                            error={inputgender}
                            keyboardType='text'
                            onFocus={() => setInputGender(false)}
                            textColor={COLORS.gray}
                            value={gender}
                            // placeholder={'First Name'}
                            placeholderTextColor={COLORS.gray}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={gender => setGender(gender)
                            }
                            style={styles.TextInput}
                        /> */}
                    </View>

                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Age</Text>
                        <TextInput
                            // label={'First Name'}
                            error={inputage}
                            keyboardType='number-pad'
                            onFocus={() => setInputAge(false)}
                            textColor={COLORS.gray}
                            value={age}
                            // placeholder={'First Name'}
                            placeholderTextColor={COLORS.gray}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={age => setAge(age)
                            }
                            style={styles.TextInput}
                        />
                    </View>

                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Height</Text>
                        <TextInput
                            // label={'First Name'}
                            error={inputheight}
                            keyboardType='number-pad'
                            onFocus={() => setInputHeight(false)}
                            textColor={COLORS.gray}
                            value={height}
                            // placeholder={'First Name'}
                            placeholderTextColor={COLORS.gray}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={height => setHeight(height)
                            }
                            style={styles.TextInput}
                        />
                    </View>

                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Country/City</Text>
                        <TextInput
                            // label={'First Name'}
                            error={inputcountry}
                            keyboardType='text'
                            onFocus={() => setInputCountry(false)}
                            textColor={COLORS.gray}
                            value={country}
                            // placeholder={'First Name'}
                            placeholderTextColor={COLORS.gray}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={country => setCountry(country)
                            }
                            style={styles.TextInput}
                        />
                    </View>


                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Status</Text>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.pink,
                            height: 40,
                        }}>
                            <Picker
                                selectedValue={marrigeStatus}
                                onValueChange={(itemValue, itemIndex) =>
                                    setMarrigeStatus(itemValue)
                                }
                                style={{
                                    color: COLORS.gray,
                                    height: 35,
                                }}>
                                <Picker.Item label="Unmarried" value="Unmarried" />
                                <Picker.Item label="Married" value="Married" />
                                <Picker.Item label="Divorce" value="Divorce" />
                            </Picker>
                        </View>
                    </View>


                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Food Type</Text>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.pink,
                            height: 40,
                        }}>
                            <Picker
                                selectedValue={food}
                                onValueChange={(itemValue, itemIndex) =>
                                    setfood(itemValue)
                                }
                                style={{
                                    color: COLORS.gray,
                                    height: 35,
                                }}>
                                <Picker.Item label="Halal Food" value="Halal Food" />
                                <Picker.Item label="Halal and Haram Food" value="Halal and Haram Food" />
                            </Picker>
                        </View>
                    </View>



                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Postal Code</Text>
                        <TextInput
                            // label={'First Name'}
                            error={inputpostalCode}
                            keyboardType='number-pad'
                            onFocus={() => setInputPostalCode(false)}
                            textColor={COLORS.gray}
                            value={postalCode}
                            // placeholder={'First Name'}
                            placeholderTextColor={COLORS.gray}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={postalCode => setPostalCode(postalCode)
                            }
                            style={styles.TextInput}
                        />
                    </View>

                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Job Description</Text>
                        <TextInput
                            error={inputdescription}
                            keyboardType='text'
                            onFocus={() => setInputDescription(false)}
                            // label={'First Name'}
                            textColor={COLORS.gray}
                            value={description}
                            // placeholder={'First Name'}
                            placeholderTextColor={COLORS.gray}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={description => setDescription(description)
                            }
                            style={styles.TextInput}
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Marrige Time Period</Text>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.pink,
                            height: 40,
                        }}>
                            <Picker
                                selectedValue={timePeriod}
                                onValueChange={(itemValue, itemIndex) =>
                                    setTimePeriod(itemValue)
                                }
                                style={{
                                    color: COLORS.gray,
                                    height: 35,
                                }}>
                                <Picker.Item label="1year" value="1year" />
                                <Picker.Item label="2year" value="2year" />
                                <Picker.Item label="3year" value="3year" />
                                <Picker.Item label="4year" value="4year" />
                                <Picker.Item label="5year" value="5year" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Account Type</Text>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.pink,
                            height: 40,
                        }}>
                            <Picker
                                selectedValue={accountType}
                                onValueChange={(itemValue, itemIndex) =>
                                    setAccountType(itemValue)
                                }
                                style={{
                                    color: COLORS.gray,
                                    height: 35,
                                }}>
                                <Picker.Item label="Normal" value="Normal" />
                                {/* <Picker.Item label="Premium" value="Premium" /> */}
                            </Picker>
                        </View>
                        {/* <TextInput
                            keyboardType='text'
                            // label={'First Name'}
                            textColor={COLORS.gray}
                            value={accountType}
                            // placeholder={'First Name'}
                            placeholderTextColor={COLORS.gray}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={accountType => setAccountType(accountType)
                            }
                            style={styles.TextInput}
                        /> */}
                    </View>
                    <View style={styles.container}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, }}>Details</Text>
                        <TextInput
                            // label={'First Name'}
                            error={inputdetails}
                            keyboardType='text'
                            onFocus={() => setInputDetails(false)}
                            textColor={COLORS.gray}
                            value={details}
                            // placeholder={'First Name'}
                            placeholderTextColor={COLORS.gray}
                            mode='underline'
                            underlineColor={COLORS.pink}
                            activeUnderlineColor={COLORS.pink}
                            theme={{
                                colors: {
                                    uderline: 'white',
                                }
                            }}
                            onChangeText={details => setDetails(details)
                            }
                            style={styles.TextInput}
                        />
                    </View>
                    <View style={styles.container2}>
                        <Button color={COLORS.main} title="Select image" onPress={pickImage}
                        />
                        {image && <Image source={{ uri: image }} style={{
                            width: 100,
                            height: 100,
                            borderRadius: 20,
                            marginVertical: 5,
                            resizeMode: 'contain'
                        }} />}
                        {/* </TouchableHighlight> */}
                    </View>


                    {!uploading == true ? (<View style={{
                        paddingHorizontal: 20,
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                    }}>

                        <View style={{ height: 50 }}>
                            <TouchableOpacity style={styles.btn}
                                onPress={OnhandleSubmit}>
                                <Text style={{ fontSize: 20, color: COLORS.pink }}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>) : (
                        <View style={{
                            paddingHorizontal: 20,
                            justifyContent: 'space-between',
                            paddingVertical: 10,
                        }}>
                            <View style={{ height: 50 }}>
                                <TouchableOpacity style={styles.btn}
                                    onPress={OnhandleSubmit}>
                                    <ActivityIndicator size="small" color={COLORS.pink} animating={uploading} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default UserInfoScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    container2: {
        paddingHorizontal: 0,
        paddingBottom: 10,
        paddingVertical: 10,
        marginHorizontal: 20,
    },
    TextInput: {
        padding: 0,
        backgroundColor: COLORS.transparent,
        color: COLORS.gray2,
        flex: 1,
        height: 40,
        justifyContent: "center"
    },
    btn: {
        flex: 1,
        width: 80,
        height: 50,
        borderRadius: 4,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.pink,
        justifyContent: 'center',
        alignItems: 'center',
    },

})