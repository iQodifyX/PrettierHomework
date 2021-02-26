import { auth } from "../App";
import { SignOut } from "./Auth";

const Main = () => {
  const { displayName, photoURL } = auth.currentUser;

  return (
    <div>
      <h1>Welcome back, {displayName}</h1>
      <img src={photoURL} alt="" />
      <SignOut />
    </div>
  );
};

export { Main };
