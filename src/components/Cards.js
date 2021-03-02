import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore, auth, firebase } from "../App";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";

const OneCard = (props) => {
  const { uid } = auth.currentUser;
  const classes = useStyles();
  const confirm = useConfirm();
  const {
    title,
    description,
    url,
    state,
    id,
    color,
    image,
    label,
  } = props.event;

  const updateState = () => {
    const newState = state ? false : true;
    firestore.collection("users").doc(uid).collection("events").doc(id).set(
      {
        state: newState,
      },
      { merge: true }
    );
  };

  const tryDelete = () => {
    confirm({
      description: "This action is permanent",
      confirmationButtonProps: { autoFocus: true },
    })
      .then(() => {
        firestore
          .collection("users")
          .doc(uid)
          .collection("events")
          .doc(id)
          .delete();
      })
      .catch(() => undefined);
  };

  const tryUrl = () => {
    confirm({
      description: `This will link will take you to an external webpage`,
      confirmationButtonProps: {
        href: url,
        target: "_blank",
      },
    })
      .then(() => undefined)
      .catch(() => undefined);
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Card className={classes.card}>
          {image ? (
            <CardMedia image={image} className={classes.image} />
          ) : undefined}
          <div
            component=""
            className={classes.cardMedia}
            style={{ backgroundColor: color ? color : "crimson" }}
          />

          <CardContent className={classes.cardContent}>
            <Typography variant="h5" component="h2" gutterBottom>
              {title}
            </Typography>
            <div style={{ display: "flex", margin: "0px" }}>
              {label
                ? label.map((name) => (
                    <Typography
                      variant="body2"
                      key={`${name}-${id}`}
                      className={classes.labels}
                    >
                      {name}
                    </Typography>
                  ))
                : undefined}
            </div>
            <Typography>{description}</Typography>
          </CardContent>
          <CardActions>
            {url ? (
              <>
                <Button
                  size="small"
                  color="primary"
                  target="_blank"
                  onClick={tryUrl}
                >
                  View
                </Button>
                <Button size="small" color="primary" onClick={updateState}>
                  {state ? "Done" : "Mark undone"}
                </Button>
              </>
            ) : (
              <Button size="small" color="primary" onClick={updateState}>
                {state ? "Done" : "Mark undone"}
              </Button>
            )}
            <Button size="small" color="primary" onClick={tryDelete}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

const Cards = () => {
  const { uid } = auth.currentUser;
  const classes = useStyles();
  let [limit, setLimit] = useState(6);

  const undoneQuery = firestore
    .collection("users")
    .doc(uid)
    .collection("events")
    .where("state", "==", true);
  const doneQuery = firestore
    .collection("users")
    .doc(uid)
    .collection("events")
    .where("state", "==", false)
    .limit(limit);

  const mockEvent = () => {
    firestore
      .collection("users")
      .doc(uid)
      .collection("events")
      .add({
        title: "Test event",
        description: "This is a mock event made for testing purposes",
        state: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        url: "https://firebase.google.com/docs/firestore/",
        color: "black",
        label: ["test", "math"],
      });
  };

  const [undoneEvents] = useCollectionData(undoneQuery, { idField: "id" });
  const [doneEvents] = useCollectionData(doneQuery, { idField: "id" });

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Typography
          color="textPrimary"
          variant="h2"
          align="center"
          className={classes.title}
        >
          Tasks
        </Typography>
        <Grid container spacing={4}>
          {undoneEvents &&
            undoneEvents.map((event) => (
              <OneCard key={event.id} event={event} />
            ))}
        </Grid>
      </Container>
      <Typography
        color="textPrimary"
        variant="h2"
        align="center"
        className={classes.title}
      >
        Done
      </Typography>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
          {doneEvents &&
            doneEvents.map((event) => <OneCard key={event.id} event={event} />)}
        </Grid>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={mockEvent}
            className={classes.mockEvent}
          >
            New event
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              setLimit(limit === 6 ? (limit = 10000) : (limit = 6))
            }
            className={classes.mockEvent}
          >
            {limit === 6 ? "Show all" : "Show less"}
          </Button>
        </div>
      </Container>
    </>
  );
};

export { Cards, Card };
