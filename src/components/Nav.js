import {
  AppBar,
  Avatar,
  CssBaseline,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Event } from "@material-ui/icons";
import { auth } from "../App";
import { useStyles } from "../styles/styles";
import { SignOut } from "./Auth";

const Nav = () => {
  const { displayName, photoURL } = auth.currentUser;
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <AppBar className={classes.nav} position="relative">
        <Toolbar>
          <Event />
          <Typography className={classes.textLogo} variant="h6">
            Prettier homework
          </Typography>
          <div className={classes.userSection}>
            <SignOut className={classes.signOut} />

            <Avatar className={classes.user} alt={displayName} src={photoURL} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export { Nav };
