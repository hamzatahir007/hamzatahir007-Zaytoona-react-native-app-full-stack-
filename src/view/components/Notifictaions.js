import firestore from '@react-native-firebase/firestore';

const Notifictaions = (Docuser, noticeStatus, tag, type, RequestStatus, noticeID, NoticeName) => {
    // const noticeStatus = 'Unread';
    // const status = 'is your match founded';
    // const type = 'Swap';
    // const RequestStatus = 'Accepted';
    // console.log(Docuser);
    // console.log(noticeStatus);
    // console.log(tag);
    // console.log(type);
    // console.log(RequestStatus);
    // console.log(noticeID);
    // const admin = require('firebase-admin');
    // console.log(NoticeName);
    try {
        firestore()
            .collection('notification').doc(Docuser).set({
                Notices: firestore.FieldValue.arrayUnion({
                    uid: noticeID,
                    noticeStatus: noticeStatus,
                    status: tag,
                    type: type,
                    userName: NoticeName,
                    requestStatus: RequestStatus,
                    timeStamp: firestore.Timestamp.now(),
                    // createdAt: firestore.FieldValue.serverTimestamp(),
                }),
            }, { merge: true })
            .then(() => {
                console.log('Notices send!');
            });
    }
    catch (e) {
        console.log(e);
    }
}

export default Notifictaions
