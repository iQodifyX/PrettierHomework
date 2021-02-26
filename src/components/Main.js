import { auth } from "../App";
import { SignOut } from "./Auth";
import Card from "./Card";

const TestData = {
  color: "green",
  asignature: "Matemáticas",
  activity: "Lorem Ipsum",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos tempore et consectetur quas ipsum velit, laboriosam hic corrupti cupiditate ullam.",
};

const Main = () => {
  const { displayName, photoURL } = auth.currentUser;

  return (
    <div>
      <h1>Welcome back, {displayName}</h1>
      <img src={photoURL} alt="" />
      <SignOut />
      <Card data={TestData} />
    </div>
  );
};

export { Main };
