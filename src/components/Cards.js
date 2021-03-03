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
import { EditMenu } from "./Edit";
import DoneIcon from "@material-ui/icons/Done";
import RestoreIcon from "@material-ui/icons/Restore";
import LinkIcon from "@material-ui/icons/Link";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const OneCard = (props) => {
  const { uid } = auth.currentUser;
  const classes = useStyles();
  const confirm = useConfirm();
  const { title, description, url, state, id, color, label } = props.event;
  const done = props.done;

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
      {done === true && state === false ? undefined : (
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card className={state ? classes.card : classes.cardDone}>
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
                {label ? (
                  <Typography variant="body2" className={classes.labels}>
                    {label}
                  </Typography>
                ) : undefined}
              </div>
              <Typography>{description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={updateState}>
                {state ? <DoneIcon /> : <RestoreIcon />}
              </Button>
              <EditMenu edit={props.event} />
              {url ? (
                <Button
                  size="small"
                  color="primary"
                  target="_blank"
                  onClick={tryUrl}
                >
                  <LinkIcon />
                </Button>
              ) : undefined}
              <Button size="small" color="primary" onClick={tryDelete}>
                <DeleteOutlineIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </>
  );
};

const Cards = () => {
  const { uid } = auth.currentUser;
  const classes = useStyles();
  let [limit, setLimit] = useState(9);
  let [done, setDone] = useState(false);

  const undoneQuery = firestore
    .collection("users")
    .doc(uid)
    .collection("events")
    .orderBy("timestamp", "desc")
    .limit(limit);

  const [undoneEvents] = useCollectionData(undoneQuery, { idField: "id" });

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
              <OneCard key={event.id} event={event} done={done} />
            ))}
        </Grid>
        <div className={classes.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              setLimit(limit === 9 ? (limit = 10000) : (limit = 9))
            }
            className={classes.button}
          >
            {limit === 9 ? "More" : "Less"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDone(done ? false : true)}
            className={classes.button}
          >
            {done ? <RestoreIcon /> : <DoneIcon />}
          </Button>
        </div>
      </Container>
    </>
  );
};

export { Cards, Card };
