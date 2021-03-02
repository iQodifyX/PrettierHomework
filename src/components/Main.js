import { Container, CssBaseline, Grid } from "@material-ui/core";
import { auth, firestore } from "../App";
import { useStyles } from "../styles/styles";
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
          {/*Today Section*/}
          <Grid item sm={12}>
            <Container maxWidth="lg">
              <Cards />
            </Container>
          </Grid>
          {/*End Today Section*/}
          {/*
            <Grid item sm={12} md={6} lg={8}>
            <Typography
              color="textPrimary"
              variant="h2"
              align="center"
              className={classes.title}
            >
              Asignatures
            </Typography>
          </Grid>
          */}
        </Grid>
      </main>
    </div>
  );
};

export { Main };
