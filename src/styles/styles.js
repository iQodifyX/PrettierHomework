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
    paddingTop: "20px",
  },
  userSection: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
  },
  taskDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "82vw",
  },
  textLogo: {
    padding: "20px",
  },
  user: {
    marginLeft: "15px",
  },
  cardGrid: {
    padding: "15px",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardDone: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    opacity: 0.5,
  },
  doneCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    opacity: 0.8,
  },
  cardMedia: {
    paddingTop: "10px",
  },
  cardContent: {
    flexGrow: 1,
  },
  image: {
    height: "100px",
  },
  labels: {
    padding: "3px 9px 3px 9px",
    margin: "0px 0px 5px 0px",
    backgroundColor: "#ededed",
    borderRadius: "1rem",
    border: "1px solid black",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  button: {
    marginLeft: "5px",
    marginRight: "5px",
  },
  buttonDiv: {
    position: "fixed",
    bottom: "3%",
    right: "3%",
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
