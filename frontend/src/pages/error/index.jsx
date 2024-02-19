import { makeStyles, Paper, Typography } from "@material-ui/core";

function ErrorPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.errorBox}>
        <Typography variant="h5" color="error">
          Error {errorCode}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {errorMessage}
        </Typography>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  errorBox: {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f8d7da",
  },
}));
