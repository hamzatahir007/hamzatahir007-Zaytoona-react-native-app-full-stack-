import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import MyStack from './src/view/navigation/navigation';
import React, { useEffect, useState } from 'react';
import { Alert, AppRegistry } from 'react-native';
// import messaging from '@react-native-firebase/messaging';

// const store = mystore();

const App = () => {
  // const [notification, setNotification] = useState({
  //   title: undefined,
  //   body: undefined,
  //   image: undefined,
  // });

  // // const getToken = async () => {
  // //   const token = await messaging().getToken();
  // //   console.log('.........................: ', token);
  // // };
  
  // useEffect(() => {
  //   // getToken();
  //   messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     setNotification({
  //       title: remoteMessage.notification.title,
  //       body: remoteMessage.notification.body,
  //       image: remoteMessage.notification.android.imageUrl,
  //     });
  //     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
  //     setNotification({
  //       title: remoteMessage.notification.title,
  //       body: remoteMessage.notification.body,
  //       image: remoteMessage.notification.android.imageUrl,
  //     });
  //   });


  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           JSON.stringify(remoteMessage),
  //         );
  //         setNotification({
  //           title: remoteMessage.notification.title,
  //           body: remoteMessage.notification.body,
  //           image: remoteMessage.notification.android.imageUrl,
  //         });
  //       }
  //     });

  //   // return unsubscribe;

  // }, []);



  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;