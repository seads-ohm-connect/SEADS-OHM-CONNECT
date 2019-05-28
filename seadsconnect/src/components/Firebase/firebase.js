import firebase from 'firebase'
import 'firebase/auth';
import Keys from '../../../keys'

class Firebase {
  constructor() {

    firebase.initializeApp(Keys.CONFIG);

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
  } else firebaseApp = firebase;
  //alert(firebase.apps.length);
  return firebaseApp;
}

export default getFirebase;
