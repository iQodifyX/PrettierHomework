import { auth, firebase } from "../App";

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div>
      <button className="sign-in" onClick={signInWithGoogle}>
        Inicia Sesión
      </button>
    </div>
  );
};

const SignOut = () => {
  return (
    <button className="sign-out" onClick={() => auth.signOut()}>
      Cierra Sesión
    </button>
  );
};

export { SignIn, SignOut };
