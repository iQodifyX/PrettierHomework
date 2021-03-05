import React, { useState } from "react";
import {
  Button,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import { useTheme } from "@material-ui/core/styles";
import { ColorPicker } from "material-ui-color";
import { useConfirm } from "material-ui-confirm";
import { firebase, firestore, auth } from "../App";
import { useStyles } from "../styles/styles";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const AddEvent = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("crimson");
  const [label, setLabel] = useState("");
  const [date, setDate] = useState(new Date());
  const confirm = useConfirm();
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { uid } = auth.currentUser;
  const failSubmit = () => {
    confirm({
      title: "You can't submit this form",
      description:
        "There are incomplete fields. Check the requiered fields are complete and try again",
      confirmationButtonProps: { autoFocus: true },
    })
      .then(() => undefined)
      .catch(() => setOpen(false));
  };
  const handleClickOpen = () => {
    setOpen(true);
    setTitle("");
    setDescription("");
    setUrl("");
    setLabel("");
    setColor("Crimson");
    setDate(new Date());
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    const data = {
      title: title,
      description: description,
      url: url,
      color: color,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      state: true,
      label: label,
      date: date,
    };

    const upload = (data) => {
      firestore.collection("users").doc(uid).collection("events").add(data);
      setOpen(false);
    };

    //console.log(data) // output debug
    data.title && data.description ? upload(data) : failSubmit();
  };

  return (
    <div className={classes.buttonDiv}>
      <Button
        color="secondary"
        variant="contained"
        size="medium"
        onClick={handleClickOpen}
        aria-label="Create a task"
        style={{ borderRadius: "50%", height: "70px", width: "70px" }}
      >
        <Add style={{ fontSize: "50px" }} />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{ backgroundColor: color, height: "10px" }}></div>
        <DialogTitle id="responsive-dialog-title">
          {"Create a task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the following information in order to create the task
          </DialogContentText>
          <TextField
            required
            autoFocus={true}
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
              <DateTimePicker value={date} onChange={setDate} />
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
            autoFocus
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
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { AddEvent };
