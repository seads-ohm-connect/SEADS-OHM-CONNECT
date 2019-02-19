import app from 'firebase/app';
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
    app.initializeApp(config);

    this.auth = app.auth();
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

let firebase;

function getFirebase(app, auth) {
  if (!firebase) {
    firebase = new Firebase(app, auth);
  }

  return firebase;
}

export default getFirebase;
