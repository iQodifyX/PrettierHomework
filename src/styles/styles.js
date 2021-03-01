import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
  },
  userSection: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
  },
  textLogo: {
    padding: "20px",
  },
  user: {
    marginLeft: "15px",
  },
}));

export { useStyles };
