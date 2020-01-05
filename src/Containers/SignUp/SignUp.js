import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
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
  signupBtn: {
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
    },
    "&:active": {
      transform: "translateY(2px)"
    }
  }
}));

export default function Login() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);
  const handleUserName = e => {
    setUserName(e.target.value);
  };
  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  };
  const isFormEmpty = () => {
    const err = [];
    let value =
      !!userName.length &&
      !!email.length &&
      !!password.length &&
      !!confirmPassword.length;
    if (!value) {
      err.push("Please fill in all fields.");
      setError(err);
    }
    return value;
  };
  const isPasswordValid = () => {
    const err = [];
    if (password.length < 6 || confirmPassword.length < 6) {
      setError([]);
      err.push("Password should be atleast 6 character.");
      setError(err);
      return false;
    } else if (password !== confirmPassword) {
      setError([]);
      err.push("Password mismatch.");
      setError(err);
      return false;
    }
  };
  const isFormValid = () => {
    if (!isFormEmpty()) {
      console.log("EMPTY");
      return false;
    } else if (isPasswordValid()) {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (isFormValid()) {
      setError([]);
      console.log("ok");
    } else {
      console.log("not ok");
    }
  };
  console.log(error);
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h1 className={classes.login}>Sign Up</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item style={{ width: "90%" }}>
              <TextField
                id="input-with-icon-grid"
                label="Username"
                style={{ width: "100%" }}
                onChange={handleUserName}
                value={userName}
                type="text"
              />
            </Grid>
          </Grid>
          <div style={{ lineHeight: "15px" }}>&nbsp;</div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <MailOutlineIcon />
            </Grid>
            <Grid item style={{ width: "90%" }}>
              <TextField
                id="input-with-icon-grid"
                label="Email"
                style={{ width: "100%" }}
                onChange={handleEmail}
              />
            </Grid>
          </Grid>
          <div style={{ lineHeight: "15px" }}>&nbsp;</div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <LockIcon />
            </Grid>
            <Grid item style={{ width: "90%" }}>
              <TextField
                id="input-with-icon-grid"
                label="Password"
                style={{ width: "100%" }}
                onChange={handlePassword}
                type="password"
              />
            </Grid>
          </Grid>
          <div style={{ lineHeight: "15px" }}>&nbsp;</div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <ConfirmationNumberIcon />
            </Grid>
            <Grid item style={{ width: "90%" }}>
              <TextField
                id="input-with-icon-grid"
                label="Confirm Password"
                style={{ width: "100%" }}
                onChange={handleConfirmPassword}
                type="password"
              />
            </Grid>
          </Grid>
          <div style={{ lineHeight: "50px" }}>&nbsp;</div>
          <button className={classes.signupBtn} type="submit">
            Sign Up
          </button>
          <div style={{ lineHeight: "15px" }}>&nbsp;</div>
          <p>
            Already have an account?{" "}
            <span style={{ color: "blue", textDecoration: "underline" }}>
              Log in
            </span>
          </p>
          <div style={{ lineHeight: "15px" }}>&nbsp;</div>
        </form>
      </div>
    </div>
  );
}
