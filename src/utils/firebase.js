import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAXuq06eM17ZVWhThb99_-4DFuOgKtmlfU",
    authDomain: "surf-log-bcbb2.firebaseapp.com",
    projectId: "surf-log-bcbb2",
    storageBucket: "surf-log-bcbb2.appspot.com",
    messagingSenderId: "445810296045",
    appId: "1:445810296045:web:71a484a6e0a1aed19c38e4"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const auth = firebaseApp.auth()
export default firebaseApp