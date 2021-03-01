import { Container, CssBaseline, Typography } from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { Cards } from "./Cards";
import { Nav } from "./Nav";

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <CssBaseline />
      <Nav />
      <main>
        <Container maxWidth="md">
          <Typography
            color="textPrimary"
            variant="h2"
            align="center"
            className={classes.title}
          >
            Events
          </Typography>
        </Container>
        <Cards />
      </main>
    </div>
  );
};

export { Main };
