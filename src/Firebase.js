import * as firebase from "firebase";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyAEmfChIahjgpB8PQu3VLaeOX8sOwm0k4g",
  authDomain: "smartinventory-1f53b.firebaseapp.com",
  databaseURL: "https://smartinventory-1f53b.firebaseio.com",
  projectId: "smartinventory-1f53b",
  storageBucket: "smartinventory-1f53b.appspot.com",
  messagingSenderId: "164089194254"
};

export default class Firebase {
  // static firestore: firebase.firestore.Firestore;
  static auth: firebase.auth.Auth;
  static firestore: firebase.firestore.Firestore;
  static database: firebase.database.Database;


  static init() {
    firebase.initializeApp(config);
    Firebase.auth = firebase.auth();
    Firebase.firestore = firebase.firestore();
    Firebase.database = firebase.database()
  }
}
