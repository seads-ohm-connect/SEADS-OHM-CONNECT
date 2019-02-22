import firebase from 'firebase'
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDCgkEeibjzmIYn4LlIpFZcdcz9k1AJSQQ",
  authDomain: "seadsconnect.firebaseapp.com",
  databaseURL: "https://seadsconnect.firebaseio.com",
  projectId: "seadsconnect",
  storageBucket: "seadsconnect.appspot.com",
  messagingSenderId: "515432152968"
};


class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) => {
    this.auth.createUserWithEmailAndPassword(email, password); 
  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

let firebaseApp;

function getFirebase () {
  if (firebase.apps.length < 1) {
    firebaseApp = new Firebase();
  }
  else firebaseApp = firebase;
  //alert(firebase.apps.length);
  return firebaseApp;
}

export default getFirebase;
