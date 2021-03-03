import { Container, CssBaseline, Grid } from "@material-ui/core";
import { auth, firestore } from "../App";
import { useStyles } from "../styles/styles";
import { AddEvent } from "./Add";
import { Cards } from "./Cards";
import { Nav } from "./Nav";

const Main = () => {
  const classes = useStyles();
  const { uid, displayName, photoURL } = auth.currentUser;
  firestore.collection("users").doc(uid).set({
    displayName: displayName,
    photoURL: photoURL,
  });

  return (
    <div className={classes.main}>
      <CssBaseline />
      <Nav />
      <main>
        <Grid container>
          <Grid item sm={12}>
            <Container maxWidth="lg">
              <Cards />
            </Container>
          </Grid>
          <AddEvent className={classes.addButton} />
        </Grid>
      </main>
    </div>
  );
};

export { Main };
