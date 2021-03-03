import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore, auth } from "../App";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";

const OneCard = (props) => {
  const { uid } = auth.currentUser;
  const classes = useStyles();
  const confirm = useConfirm();
  const { title, description, url, state, id, color, label } = props.event;

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
      description: `This link will take you to an external webpage`,
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
  let [limit1, setLimit1] = useState(6);
  let [limit2, setLimit2] = useState(6);

  const undoneQuery = firestore
    .collection("users")
    .doc(uid)
    .collection("events")
    .where("state", "==", true)
    .limit(limit1);
  const doneQuery = firestore
    .collection("users")
    .doc(uid)
    .collection("events")
    .where("state", "==", false)
    .limit(limit2);

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
          gutterBottom
        >
          Tasks
        </Typography>
        <Grid container spacing={4}>
          {undoneEvents &&
            undoneEvents.map((event) => (
              <OneCard key={event.id} event={event} />
            ))}
        </Grid>
        <div className={classes.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              setLimit1(limit1 === 6 ? (limit1 = 10000) : (limit1 = 6))
            }
            className={classes.button}
          >
            {limit1 === 6 ? "Show all" : "Show less"}
          </Button>
        </div>
      </Container>
      <Typography
        color="textPrimary"
        variant="h2"
        align="center"
        className={classes.title}
        gutterBottom
      >
        Done
      </Typography>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
          {doneEvents &&
            doneEvents.map((event) => <OneCard key={event.id} event={event} />)}
        </Grid>
        <div className={classes.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              setLimit2(limit2 === 6 ? (limit2 = 10000) : (limit2 = 6))
            }
            className={classes.mockEvent}
          >
            {limit2 === 6 ? "Show all" : "Show less"}
          </Button>
        </div>
      </Container>
    </>
  );
};

export { Cards, Card };
