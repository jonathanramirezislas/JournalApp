import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDwOL7XduIxMKOBWOeoWX8RkunJRaG7gEU",
    authDomain: "journal-app-b102d.firebaseapp.com",
    projectId: "journal-app-b102d",
    storageBucket: "journal-app-b102d.appspot.com",
    messagingSenderId: "775118949210",
    appId: "1:775118949210:web:51c695481efcf44801c163",
    measurementId: "G-TDY51ZHP7V"
};
  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}