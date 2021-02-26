import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { SignIn } from "./components/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Main } from "./components/Main";

firebase.initializeApp({
  apiKey: "AIzaSyC8I4hJR1hIZi-Ec_diOQA7CRLiSRWtekk",
  authDomain: "prettier-homework.firebaseapp.com",
  projectId: "prettier-homework",
  storageBucket: "prettier-homework.appspot.com",
  messagingSenderId: "251657287405",
  appId: "1:251657287405:web:54943cd900d3e4ad5b7ee4",
  measurementId: "G-RLH5JXHJ6C",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <section>{user ? <Main /> : <SignIn />}</section>
    </div>
  );
};

export { firebase, auth, firestore };
export default App;
