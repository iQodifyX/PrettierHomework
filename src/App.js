import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { SignIn } from "./components/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Main } from "./components/Main";
import { ConfirmProvider } from "material-ui-confirm";
import { SnackbarProvider } from "notistack";

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
    <>
      <SnackbarProvider maxSnack={3}>
        <ConfirmProvider>
          <section>{user ? <Main /> : <SignIn />}</section>
        </ConfirmProvider>
      </SnackbarProvider>
    </>
  );
};

export { firebase, auth, firestore, analytics };
export default App;
