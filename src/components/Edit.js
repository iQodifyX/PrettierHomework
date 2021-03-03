import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ColorPicker } from "material-ui-color";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { auth, firestore } from "../App";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

const EditMenu = (props) => {
  const { uid } = auth.currentUser;
  const { title, description, url, label, color, id } = props.edit;
  const [newTitle, setNewTitle] = useState(title ? title : "");
  const [newDesc, setNewDesc] = useState(description ? description : "");
  const [newUrl, setNewUrl] = useState(url ? url : "");
  const [newLabel, setNewLabel] = useState(label ? label : "");
  const [newColor, setNewColor] = useState(color ? color : "Crimson");
  const theme = useTheme();
  const confirm = useConfirm();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTitle(title ? title : "");
    setNewDesc(description ? description : "");
    setNewUrl(url ? url : "");
    setNewColor(color ? color : "");
    setNewLabel(label ? label : "");
  };

  const failSubmit = () => {
    confirm({
      title: "You can't submit this form",
      description:
        "There are incomplete fields. Check the requiered fields are complete and try again",
      confirmationButtonProps: { autoFocus: true },
    })
      .then(() => undefined)
      .catch(() => handleClose());
  };

  const submit = () => {
    const data = {
      title: newTitle,
      description: newDesc,
      url: newUrl,
      color: newColor,
      label: newLabel,
    };

    const upload = () => {
      firestore
        .collection("users")
        .doc(uid)
        .collection("events")
        .doc(id)
        .set(data, { merge: true });
      handleClose();
    };

    data.title && data.description ? upload(data) : failSubmit();
  };

  return (
    <>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        <EditOutlinedIcon />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{ backgroundColor: newColor, height: "10px" }}></div>
        <DialogTitle>Edit your task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the following information in order to create the task
          </DialogContentText>
          <TextField
            required
            margin="normal"
            id="title"
            label="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            fullWidth
          />
          <TextField
            required
            margin="normal"
            id="description"
            label="Description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            fullWidth
          />
          <TextField
            margin="normal"
            id="url"
            label="Url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            fullWidth
          />
          <TextField
            margin="normal"
            id="label"
            label="Label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            fullWidth
          />
          <div style={{ paddingTop: "20px" }}>
            <Typography color="textSecondary" gutterBottom>
              Color
            </Typography>
            <ColorPicker
              value={newColor}
              onChange={(e) => setNewColor(`#${e.hex}`)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { EditMenu };
