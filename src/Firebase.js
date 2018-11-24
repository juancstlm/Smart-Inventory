import * as firebase from "firebase";
import "firebase/firestore";
import Config from 'react-native-config'

var config = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DATABASE_URL,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID
};

console.log('Firebase Config',Config)

export default class Firebase {
  // static firestore: firebase.firestore.Firestore;
  static auth: firebase.auth.Auth;
  static firestore: firebase.firestore.Firestore;
  static database: firebase.database.Database;


  static init() {
    const settings = {
      timestampsInSnapshots: true,
    };
    firebase.initializeApp(config);
    Firebase.auth = firebase.auth();
    Firebase.firestore = firebase.firestore();
    Firebase.firestore.settings(settings)
    Firebase.database = firebase.database()
    Firebase.storage = firebase.storage();
  }
}
