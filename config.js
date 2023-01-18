import * as React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

export const firebaseConfig = {
    apiKey: "AIzaSyCOa8bFKulk6Q71GUMGEdmuMOFycG7OuMc",
    authDomain: "zaytoona-2c425.firebaseapp.com",
    databaseURL: "https://zaytoona-2c425-default-rtdb.firebaseio.com",
    projectId: "zaytoona-2c425",
    storageBucket: "zaytoona-2c425.appspot.com",
    messagingSenderId: "952598013385",
    appId: "1:952598013385:web:cd7371022f0a9432b57418",
    measurementId: "G-YZW02JC4C5"
}


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export default () => {
    return { firebase, auth }
}