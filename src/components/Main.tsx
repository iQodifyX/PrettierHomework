import { Container, CssBaseline, Grid } from "@material-ui/core";
import { auth, firestore } from "../App";
import { useStyles } from "../styles/styles";
import { AddEvent } from "./Add";
import { Cards } from "./Cards";
import { Copyright } from "./Copyright";
import { Nav } from "./Nav";

const Main = () => {
  //User data
  const uid: string | undefined = auth.currentUser
    ? auth.currentUser.uid
    : undefined;
  const displayName: string | undefined = auth.currentUser?.displayName
    ? auth.currentUser.displayName
    : undefined;
  const photoURL: string | undefined = auth.currentUser?.photoURL
    ? auth.currentUser.photoURL
    : undefined;
  const phoneNumber: string = auth.currentUser?.phoneNumber
    ? auth.currentUser.phoneNumber
    : "";

  //Other hooks
  const classes = useStyles();

  //Update user info
  firestore.collection("users").doc(uid).set({
    displayName: displayName,
    photoURL: photoURL,
    phoneNumber: phoneNumber,
  });

  return (
    <div className={classes.main}>
      <CssBaseline>
        <Nav />
        <main>
          <Grid container>
            <Grid item sm={12}>
              <Container maxWidth="lg">
                <Cards />
              </Container>
            </Grid>
          </Grid>
          <AddEvent />
        </main>
        <div style={{ marginTop: "50px", paddingBottom: "50px" }}>
          <Copyright />
        </div>
      </CssBaseline>
    </div>
  );
};

export { Main };
