import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useStyles } from "../styles/styles";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const OneCard = () => {
  const classes = useStyles();
  var [opacity, setOpacity] = useState(1);

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card} style={{ opacity: opacity }}>
          <div
            component=""
            className={classes.cardMedia}
            style={{ backgroundColor: "green" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" gutterBottom component="h2">
              Heading
            </Typography>
            <Typography>
              This is a media card. You can use this section to describe the
              content.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" href="#" target="_blank">
              View
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => setOpacity((opacity = 0.5))}
            >
              Done
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

const Cards = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <OneCard key={card} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export { Cards, Card };
