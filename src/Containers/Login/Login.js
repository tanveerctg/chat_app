import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import indigo from "@material-ui/core/colors/indigo";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    background: "#FAFAFA",
    minWidth: "550px",
    borderRadius: "10px",
    "@media ( max-width:580px)": {
      minWidth: "100%"
    }
  },
  login: {
    fontSize: "40px",
    textAlign: "center"
  },
  form: {
    width: "80%",
    margin: "0 auto",
    textAlign: "center",
    "@media ( max-width:580px)": {
      width: "90%"
    }
  },
  formInput: {
    width: "90%",
    "@media ( max-width:580px)": {
      width: "95%"
    }
  },
  loginBtn: {
    textTransform: "uppercase",
    width: "12rem",
    padding: "7px 0",
    background: "#333333",
    color: "white",
    border: "transparent",
    fontWeight: "600",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      background: "#1488CC" /* fallback for old browsers */,
      background:
        "-webkit-linear-gradient(to right, #2B32B2, #1488CC)" /* Chrome 10-25, Safari 5.1-6 */,
      background:
        "linear-gradient(to right, #2B32B2, #1488CC)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
  }
}));

export default function Login() {
  const user = indigo[500];
  const pass = grey[800];
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h1 className={classes.login}>Login</h1>
        <form className={classes.form}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle style={{ color: user }} />
            </Grid>
            <Grid item style={{ width: "90%" }}>
              <TextField
                id="input-with-icon-grid"
                label="Email"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <div style={{ lineHeight: "15px" }}>&nbsp;</div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <LockIcon style={{ color: pass }} />
            </Grid>
            <Grid item style={{ width: "90%" }}>
              <TextField
                id="input-with-icon-grid"
                label="Password"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <div style={{ lineHeight: "50px" }}>&nbsp;</div>
          <button className={classes.loginBtn}>Log in</button>
          <div style={{ lineHeight: "15px" }}>&nbsp;</div>
          <p>
            Don't have an account?{" "}
            <span style={{ color: "blue", textDecoration: "underline" }}>
              Sign Up
            </span>
          </p>
          <div style={{ lineHeight: "15px" }}>&nbsp;</div>
        </form>
      </div>
    </div>
  );
}
