import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import { firebase } from "../../firebase";
import { connect } from "react-redux";
import { credentialReducer, LOG_IN, LOG_OUT } from "../../Reducer/Credential";
import { LOADING_ON, LOADING_OFF } from "../../Reducer/LoadingReducer";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

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

function Login(props) {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);
  const userDatabaseRef = firebase.database().ref("Users");
  const NotificationsRef = firebase.database().ref("Notifications");
  let history = useHistory();

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
    } else {
      return true;
    }
  };
  const isFormValid = () => {
    if (!isFormEmpty()) {
      console.log("EMPTY");
      return false;
    } else if (!isPasswordValid()) {
      console.log("PASS Word invalid");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const err = [];
    if (isFormValid()) {
      setError([]);

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          // res.user.providerData[0].displayName = userName;

          const name = userName;
          const pass = password;
          const id = res.user.uid;
          const avatarUrl = `https://ui-avatars.com/api/?name=${name}`;
          userDatabaseRef.child(id).update({ name, pass, id, avatarUrl });
          NotificationsRef.child(id).set("");
        })
        .then(res => {
          console.log(res);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          err.push(errorMessage);
          setError(err);
          // ...
        });
    } else {
      console.log("not ok");
    }
  };
  const goToLogin = () => {
    history.push("/login");
  };
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
                type="email"
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
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer"
              }}
              onClick={goToLogin}
            >
              Log in
            </span>
          </p>
          <div style={{ lineHeight: "15px" }}>&nbsp;</div>
        </form>
        {error.length > 0 && (
          <Alert severity="error" style={{ justifyContent: "center" }}>
            {error[0]}
          </Alert>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  console.log("state", state);
};

export default connect(mapStateToProps)(Login);
