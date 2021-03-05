import { Button, IconButton, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import CancelIcon from "@material-ui/icons/Cancel";
import UndoIcon from "@material-ui/icons/Undo";

const Notification = (props) => {
  const { message, variant, autoHideDuration } = props.config;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const msg = (
    <>
      <Typography>{message}</Typography>
      <IconButton
        style={{ color: "#ffffff" }}
        aria-label="Close the notification"
        onClick={(props) => closeSnackbar(props.key)}
      >
        <CancelIcon />
      </IconButton>
      <IconButton aria-label="Undo" style={{ color: "#ffffff" }}>
        <UndoIcon />
      </IconButton>
    </>
  );

  const handleClick = () => {
    enqueueSnackbar(msg, {
      variant: variant ? variant : "default",
      autoHideDuration: autoHideDuration ? autoHideDuration : 3000,
    });
  };

  return <Button onClick={handleClick}>Show Notification</Button>;
};

export { Notification };
