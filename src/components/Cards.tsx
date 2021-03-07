import { Button, Card, CardActions, CardContent, Container, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import { useStyles } from "../styles/styles"
import { useConfirm } from "material-ui-confirm"
import { useState } from "react"
import { auth, firestore } from "../App"
import { Event } from "../typescript/interfaces"
import { EditMenu } from "./Edit"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useSnackbar } from "notistack"

//Icon imports
import DoneIcon from "@material-ui/icons/Done";
import RestoreIcon from "@material-ui/icons/Restore";
import LinkIcon from "@material-ui/icons/Link";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import UndoIcon from "@material-ui/icons/Undo";

const OneCard = (props: { event: Event }) => {
  //Destructuring
  const uid: string | undefined = auth.currentUser ? auth.currentUser.uid : undefined
  const { state, id, url, color, title, label, description }: Event = props.event

  //State Hooks
  const [currentState, setCurrentState] = useState(state)
  const [notificationId, setNotificationId] = useState(0)

  //Other hooks 
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const classes = useStyles()
  const confirm = useConfirm()

  //Undo Notification
  const showNotification = () => {
    setNotificationId(notificationId + 1)
    const nid = `${id}${notificationId}`

    const dismiss = () => {
      closeSnackbar(nid)
    }

    const msg = (
      <>
        <Typography>
          {currentState ? "Marked as done" : "Marked as pending"}
        </Typography>
        <IconButton 
          onClick={dismiss}
          aria-label="Dismiss notification"
          style={{ color: "#ffffff" }}
        >
          <CancelIcon />
        </IconButton>
        <IconButton
          onClick={() => undo(nid)}
          aria-label="Undo"
          style={{ color: "#ffffff" }}
        >
          <UndoIcon />
        </IconButton>
      </>
    )

    enqueueSnackbar(msg, {
      variant: "default",
      key: nid,
    })
  }
  
  const undo = (nid: string) => {
    setCurrentState(!currentState ? false : true)

    firestore
      .collection("users")
      .doc(uid)
      .collection("events")
      .doc(id)
      .set({state: currentState}, {merge: true})

    closeSnackbar(nid)
  }

  //Update state bool
  const updateState = () => {
    setCurrentState(currentState ? false : true)

    firestore
      .collection("users")
      .doc(uid)
      .collection("events")
      .doc(id)
      .set({state: !currentState}, {merge: true})
    
    showNotification()
  }

  //Try delete current doc in firestore
  const tryDelete = () => {
    //Delete confirmation UI
    confirm({
      title: "Are you sure you want to delete this?",
      description: "This action is going to last forever. Forever is a long time!",
      confirmationButtonProps: { autoFocus: true }
    })
      //If true
      .then(() => {
        firestore
          .collection("users")
          .doc(uid)
          .collection("events")
          .doc(id)
          .delete()
      })
      //If false
      .catch(() => undefined)
  }

  const tryUrl = () => {
    //Follow url UI
    confirm({
      title: "Are you sure?",
      description: "This link will take you to an external webpage",
      confirmationButtonProps: { autoFocus: true, href: url }
    })
      //There is no need to return anything
      .then(() => undefined)
      .catch(() => undefined)
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={currentState ? classes.card : classes.cardDone}>
          <div 
            className={classes.cardMedia}
            style={{backgroundColor: color}}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" component="h2" gutterBottom>
              {title}
            </Typography>
            <div>
              {label ? <Typography>{label}</Typography> : undefined}
              {/*Add date rendering*/ }
            </div>
            <Typography>{description}</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={updateState}
              aria-label={currentState ? "Mark as done" : "Mark as pending"}
            >
              {currentState ? <DoneIcon /> : <RestoreIcon />}
            </Button>
            <EditMenu edit={props.event}/>
            {url ? (
              <Button
                size="small"
                color="primary"
                onClick={tryUrl}
                aria-label="Go to url"
              >
                <LinkIcon />
              </Button>
            ) : undefined}
            <Button
              size="small"
              color="primary"
              onClick={tryDelete}
              aria-label="Delete"
            >
              <DeleteOutlineIcon />
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}

const Cards = () => {
  const uid: string | undefined = auth.currentUser ? auth.currentUser.uid : undefined

  const [limit, setLimit] = useState(10000)
  const [showDone, setShowDone] = useState(true) //users.config later

  const classes = useStyles()
  const theme = useTheme()
  
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"))

  const query = firestore
    .collection("users")
    .doc(uid)
    .collection("events")
    .orderBy("date", "asc")
    .limit(limit)

  const [events]: any[] | undefined = useCollectionData(query, {idField: "id"})
  
  return (
    <>
      <Container className={classes.cardGrid} maxWidth="lg">
        <div className={isSmall ? classes.taskDiv : undefined}>
          <Typography
            color="textPrimary"
            variant="h2"
            align="center"
            className={classes.title}
          >
            Tasks
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
            align="center"
            style={{ padding: "20px" }}
            gutterBottom
          >
            Add a task by clicking the "+" icon
          </Typography>
        </div>
        <Grid container spacing={4}>
          {events &&
            events.map((ev: Event) => (showDone === true && ev.state === false ? undefined : <OneCard event={ev} key={ev.id}/>))
          }
        </Grid>
        <div className={classes.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setLimit(limit === 9 ? 10000 : 9 )}
            className={classes.button}
          >
            {limit === 9 ? "More" : "Less"}
          </Button>
          <Button
            onClick={() => setShowDone(showDone ? false : true)}
            variant="contained"
            color="primary"
            className={classes.button}
            aria-label={showDone ? "Show both" : "Show just pending"}
          >
            {showDone ? <RestoreIcon /> : <DoneIcon />}
          </Button>
        </div>
      </Container>
    </>
  )
}

export { Cards }