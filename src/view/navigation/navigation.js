import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';
import Ionic from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Icon } from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';


import DashboardScreen from '../Screens/DashboardScreen';
import OnboardScreen from '../Screens/OnboardScreen'
import SignUpScreen from '../Screens/SignUpScreen';
import SplashScreen from '../Screens/SplashScreen';
import VerificationScreen from '../Screens/VerificationScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import CodeVerificationScreen from '../Screens/CodeVerificationScreen';
import UserInfoScreen from '../Screens/UserInfoScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'immer/dist/internal';
import { login, packages, selectUser, status } from '../../../redux/reducers/Reducers';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreentwo from '../Screens/SplashScreentwo';


const Stack = createNativeStackNavigator();

function MyStack() {
    const [initializing, setInitializing] = useState(true);
    const [regester, setRegester] = useState();



    const dispatch = useDispatch();
    const regesterUser = useSelector(selectUser);
    // console.log('register user: ', regesterUser);
    const [userExist, setUserExit] = useState()
    const [userData, setUserData] = useState()
    const [memberships, setMemberships] = useState();
    const [membershipUid, setMembershipUid] = useState();
    // const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(null);

    // useEffect(() => {

    //     async function launcher() {
    //         const appData = await AsyncStorage.getItem('isAppFirstLaunch');
    //         console.log(appData);
    //         if (appData == null) {
    //             setIsAppFirstLaunch(true);
    //             AsyncStorage.setItem('isAppFirstLaunch', 'false');
    //         } else {
    //             setIsAppFirstLaunch(false);
    //         }
    //     }
    //     launcher();
    // }, []);

    // Handle user state changes

    function onAuthStateChanged(user) {
        // console.log('user: ', user);
        if (user) {
            firestore().collection('users')
                .doc(user.uid)
                .onSnapshot(documentSnapshot => {
                    // console.log(documentSnapshot.exists);
                    if (documentSnapshot.exists) {
                        const data = documentSnapshot.data().userDetails
                        dispatchLoginUser(data)
                        setUserExit('found')
                    }
                    else {
                        dispatch(login(null))
                        console.log('user not exit');
                    }
                });
        }
        else {
            console.log('user uid null');
        }
        // if(null){
        //     setUser(null)
        // }else{
        // }
        // setUser(user)
        if (initializing) setInitializing(false);
    }

    const dispatchLoginUser = (data) => {
        if (data) {
            var Data = new Object();
            Data.FirstName = data.FirstName;
            Data.email = data.Email;
            Data.contactNumber = data.ContactNumber;
            Data.address = data.Address;
            Data.religion = data.Religion;
            Data.gender = data.Gender;
            Data.age = data.Age;
            Data.height = data.Height;
            Data.country = data.Country;
            Data.marrigeStatus = data.Status;
            Data.food = data.Food;
            Data.postalCode = data.PostalCode;
            Data.description = data.Description;
            Data.timePeriod = data.TimePeriod;
            Data.accountType = data.AccountType;
            Data.PackageId = data.PackageId;
            Data.image = data.postImg;
            Data.userLock = data.UserLock;

            // console.log('snapshot',Data);

            if (Data.userLock == true) {
                dispatch(status(Data.userLock))
            } else {
                dispatch(status(false))
            }
            if (Data.PackageId) {
                const Packageids = Data.PackageId;
                firestore().collection('Package')
                    .doc(Packageids)
                    .onSnapshot(documentSnapshot => {
                        if (documentSnapshot.exists) {
                            const data = documentSnapshot.data()
                            dispatchMemberships(data)
                        }
                    });
            }
            else {
                dispatch(packages(null))
            }
            dispatch(login(Data))
            setRegester(regesterUser)
        }
        else {
            dispatch(login(null))
        }
    }

    const dispatchMemberships = (data) => {
        var Data = new Object();
        Data.discountPercentage = data.discountPercentage;
        Data.discountPrice = data.discountPrice;
        Data.id = data.id;
        Data.name = data.name;
        Data.numberOfCards = data.numberOfCards;
        Data.numberOfChats = data.numberOfChats;
        Data.otherCategory = data.otherCategory;
        Data.rate = data.rate;
        Data.status = data.status;
        Data.description = data.description;

        // console.log(Data);
        dispatch(packages(Data))
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // useEffect(() =>{

    // },[regester])

    if (initializing) return null;

    if (!regesterUser) {
        return (
            //<NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="CodeVerificationScreen" component={CodeVerificationScreen} />
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
                <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
            </Stack.Navigator>
            //</NavigationContainer>
        );
    }
    return (
        //<NavigationContainer>
        <Stack.Navigator initialRouteName='DashboardScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DashboardScreen" component={BottomNavigator} />
        </Stack.Navigator>
        //</NavigationContainer>
    );
};

// const MyStack = () => {
//     return (
//         // <NavigationContainer>
//         //     <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
//         //         <Stack.Screen name="SplashScreen" component={SplashScreen} />
//         //         {/* <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         //         <Stack.Screen name="SignupScreen" component={SignupScreen} />
//         //         <Stack.Screen name="DashboardScreen" component={DashboardScreen} /> */}
//         //     </Stack.Navigator>
//         // </NavigationContainer>

//         <NavigationContainer >
//             <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
//                 <Stack.Screen name='SplashScreen' component={SplashScreen} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

export default () => {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}

// export default MyStack