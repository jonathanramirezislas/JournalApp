import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig

//No use of Production
if(process.env.NODE_ENV === 'development'){    
     firebaseConfig = {
        apiKey: process.env.DEVELOPMENT_APP_APIKEY,
        authDomain: process.env.DEVELOPMENT_APP_AUTHDOMAIN ,
        projectId: process.env.DEVELOPMENT_APP_PROJECTID,
        storageBucket: process.env.DEVELOPMENT_APP_STORAGEBUCKET,
        messagingSenderId: process.env.DEVELOPMENT_APP_MESSAGINGSENDERID,
        appId: process.env.DEVELOPMENT_APP_APPID,
        measurementId:process.env.DEVELOPMENT_APP_MEASUREMENTID,
    };
}else if(process.env.NODE_ENV === 'test'){
     firebaseConfig = {
        apiKey: process.env.TEST_APP_APIKEY,
        authDomain: process.env.TEST_APP_AUTHDOMAIN ,
        projectId: process.env.TEST_APP_PROJECTID,
        storageBucket: process.env.TEST_APP_STORAGEBUCKET,
        messagingSenderId:process.env.TEST_APP_MESSAGINGSENDERID,
        appId: process.env.TEST_APP_APPID,
        measurementId:process.env.TEST_APP_MEASUREMENTID,
    };

}


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}