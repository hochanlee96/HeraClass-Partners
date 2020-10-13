import * as firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
    apiKey: 'AIzaSyAYs8Y1rgKGc-Nzxz3KuPY87hFlMqFYWAo',
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: 'hercules-56a2b',
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};



firebase.initializeApp(firebaseConfig);


export const firebaseInstance = firebase;


export const dbService = firebase.firestore();
export const storageService = firebase.storage();


const partnersConfig = {
    apiKey: "AIzaSyCvswXAfTefCyWXqPJAcxPAihMRpsC7n-s",
    authDomain: "heraclass-partners.firebaseapp.com",
    databaseURL: "https://heraclass-partners.firebaseio.com",
    projectId: "heraclass-partners",
    storageBucket: "heraclass-partners.appspot.com",
    messagingSenderId: "493467537130",
    appId: "1:493467537130:web:4a3113c41ba022d9ce9193"
};
const partnersFirebase = firebase.initializeApp(partnersConfig, "partners");

export const authService = partnersFirebase.auth();
