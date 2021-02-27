import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
const app = firebase.initializeApp({
    apiKey: "AIzaSyAqoWnzdZWCj5mBC6Vis0roNZtWPnQD9Hw",
    authDomain: "movieapp-97bcc.firebaseapp.com",
    projectId: "movieapp-97bcc",
    storageBucket: "movieapp-97bcc.appspot.com",
    messagingSenderId: "552809403167",
    appId: "1:552809403167:web:b825a462db0a153278962a" 
})

export const db = app.firestore()
export const auth = app.auth()
export default app