import firebase from 'firebase/app'
import 'firebase/firestore'
// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyDZEazrrAtOp8HbZOS7_hiLgAOHQLXYrns",
        authDomain: "cloudfs-86b99.firebaseapp.com",
        databaseURL: "https://cloudfs-86b99.firebaseio.com",
        projectId: "cloudfs-86b99",
        storageBucket: "cloudfs-86b99.appspot.com",
        messagingSenderId: "999509607400",
        appId: "1:999509607400:web:6bb73bb3c715400584da5d",
        measurementId: "G-C9GZ69ZQMJ"
    }
    firebase.initializeApp(firebaseConfig)
}
export const db = firebase.firestore()