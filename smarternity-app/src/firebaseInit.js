
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDsTIJiettpro2o9xLoE2MISdDKAMAEM-0",
  authDomain: "smarternity-1945.firebaseapp.com",
  projectId: "smarternity-1945",
  storageBucket: "smarternity-1945.appspot.com",
  messagingSenderId: "820705209870",
  appId: "1:820705209870:web:d49c5776cd39e43975d65f"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);