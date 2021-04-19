import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

// firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

// export const userIdRef = firestore.doc().collection('/users');



export const handleUserProfile = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const { uid } = userAuth;

    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const timestamp = new Date();
        const userRoles = ['user']
        const uuid = uid;
        
        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                userRoles,
                uuid,
                ...additionalData
            });

        } catch(err) {
            // console.log(err);
        }
    }

    return userRef;

};

export default {
    firestore: firestore,
    auth: auth,
}