import { createMuiTheme, makeStyles } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.background.paper,
  },
  nav: {
    display: "flex",
  },
  title: {
    padding: "20px",
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
  cardGrid: {
    padding: "20px",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "10px",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#f44336",
    },
  },
});

export { useStyles, theme };
