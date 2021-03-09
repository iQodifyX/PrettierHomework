import { Link, Typography } from "@material-ui/core";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/iQodifyX/">
        iQodifyX
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export { Copyright };
