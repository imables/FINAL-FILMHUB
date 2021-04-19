import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/firestore'

export const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAzimdQR0eETXJQ1oCDPk2g9QfFPySJHcw",
  authDomain: "react-filmhub.firebaseapp.com",
  databaseURL: "https://react-filmhub-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-filmhub",
  storageBucket: "react-filmhub.appspot.com",
  messagingSenderId: "744011406688",
  appId: "1:744011406688:web:a39606200dd0930b431205"
        
      });

      const db = firebaseConfig.firestore();
      const auth = firebase.auth();
      const storage = firebase.storage();
    
      export default { db, auth, storage };
      export { db, auth, storage, firebase };
      // firebase.initializeApp(firebaseConfig);

      // export const firestore = firebase.firestore();
      // export const storageRef = firebase.storage();

     //export default firebase ;
