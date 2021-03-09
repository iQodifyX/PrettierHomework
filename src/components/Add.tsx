import {
  Button,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
  DialogActions,
} from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { auth, firebase, firestore } from "../App";
import { Event } from "../typescript/interfaces";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

//icon imports
import Add from "@material-ui/icons/Add";
import { ColorPicker } from "material-ui-color";

const AddEvent = () => {
  //user data
  const uid: string | undefined = auth.currentUser
    ? auth.currentUser.uid
    : undefined;

  //default states
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("Crimson");
  const [label, setLabel] = useState("");
  const [date, setDate]: [number, any] = useState(new Date().getTime());

  //other hooks
  const confirm = useConfirm();
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  //incomplete form
  const failSubmit = () => {
    confirm({
      title: "You can´t submit this form",
      description:
        "There are incomplete fields. Check the requiered fields are complete and try again",
      confirmationButtonProps: { autoFocus: true },
    })
      .then(() => undefined)
      .catch(() => setOpen(false));
  };

  const handleOpen = () => {
    setOpen(true);
    setTitle("");
    setDescription("");
    setUrl("");
    setColor("Crimson");
    setLabel("");
    setDate(new Date().getTime());
  };

  const handleClose = () => setOpen(false);

  const submit = () => {
    const data: Event = {
      title: title,
      description: description,
      url: url,
      color: color,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      state: true,
      label: label,
      date: date,
    };

    const upload = (data: Event) => {
      firestore.collection("users").doc(uid).collection("events").add(data);
      setOpen(false);
    };

    //console.log(data) // Output debug
    data.title && data.description ? upload(data) : failSubmit();
  };

  return (
    <div className={classes.buttonDiv}>
      <Button
        color="secondary"
        variant="contained"
        size="medium"
        onClick={handleOpen}
        aria-label="Create a task"
        style={{ borderRadius: "50%", height: "70px", width: "70px" }}
      >
        <Add style={{ fontSize: "50px" }} />
      </Button>
      <Dialog fullScreen={isSmall} open={open} onClose={handleClose}>
        <div style={{ backgroundColor: color, height: "10px" }} />
        <DialogTitle>Create a task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the following information in order to create a new task
          </DialogContentText>
          <TextField
            required
            margin="normal"
            id="title"
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            required
            margin="normal"
            id="description"
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <TextField
            margin="normal"
            id="url"
            label="Url"
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
          />
          <TextField
            margin="normal"
            id="label"
            label="Asignature"
            onChange={(e) => setLabel(e.target.value)}
            fullWidth
          />
          <div style={{ paddingTop: "20px" }}>
            <Typography color="textSecondary" gutterBottom>
              Date
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                value={date}
                onChange={(e) => setDate(e?.valueOf())}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div style={{ paddingTop: "20px" }}>
            <Typography color="textSecondary" gutterBottom>
              Color
            </Typography>
            <ColorPicker
              value={color}
              onChange={(e) => setColor(`#${e.hex}`)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ marginBottom: "20px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={submit}
            color="primary"
            style={{ marginBottom: "20px" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { AddEvent };
