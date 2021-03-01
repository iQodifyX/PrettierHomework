import { Container, Typography } from "@material-ui/core";
import { Nav } from "./Nav";

const Main = () => {
  //const classes = useStyles();

  return (
    <div>
      <Nav />
      <section>
        <Container maxWidth="xl">
          <Typography color="textPrimary" variant="h2" align="center">
            Events
          </Typography>
        </Container>
      </section>
    </div>
  );
};

export { Main };
