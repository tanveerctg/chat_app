import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { useSelector, useDispatch } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ADD_NEWCHANNEL } from "../../Reducer/Channel";
import { store } from "../../index";
import { firebase } from "../../firebase";
import uuidv4 from "uuid/v4";
import moment from "moment";

console.log(moment().valueOf());
const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    minWidth: "400px",
    flexDirection: "column",
    padding: "0 20px",

    "@media (max-width:450px)": {
      minWidth: "100%"
    }
  }
}));
export default function AddChannel(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = value => {
    setDialogOpen(false);
  };

  return (
    <div>
      <SimpleDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        dispatch={props.dispatch}
      />

      <List>
        <ListItem button onClick={handleDialogOpen}>
          <ListItemText primary="Add a channel" />
          <AddCircleOutlineIcon style={{ marginRight: "15px" }} />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
}

function SimpleDialog(props) {
  const [channelName, setChannelName] = useState("");
  const [channelInfo, setChannelInfo] = useState("");
  const { credentialReducer, Loading } = useSelector(state => state);
  const [error, setError] = useState(false);
  const channelDatabaseRef = firebase.database().ref("Channels");
  const { onClose, open } = props;
  const classes = useStyles();

  const handleChannelName = e => {
    setChannelName(e.target.value);
  };
  const handleChannelInfo = e => {
    setChannelInfo(e.target.value);
  };
  const handleClose = e => {
    if (credentialReducer.id) {
      if (channelName && channelInfo) {
        const info = {
          id: uuidv4(),
          name: channelName,
          info: channelInfo,
          createdTime: moment().valueOf(),
          createdBy: credentialReducer
        };
        console.log(info);
        store.dispatch({ type: ADD_NEWCHANNEL, channelInfo: info });
        channelDatabaseRef
          .child(credentialReducer.id)
          .child(info.id)
          .update(info)
          .then(() => {
            setChannelName("");
            setChannelInfo("");
          });
        onClose();
      }
    }
    onClose();

    e.preventDefault();
  };

  // useEffect(() => {
  //   console.log("ran useefeect");
  // }, Loading);
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Add a new channel</DialogTitle>

      <ValidatorForm
        onSubmit={handleClose}
        onError={errors => console.log(errors)}
        className={classes.form}
      >
        <TextValidator
          label="Channel Name"
          onChange={handleChannelName}
          style={{ marginBottom: "15px" }}
          name="Channel Name"
          value={channelName}
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
        <TextValidator
          label="Channel Info"
          onChange={handleChannelInfo}
          style={{ marginBottom: "25px" }}
          name="Channel Info"
          value={channelInfo}
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginBottom: `${error ? "10px" : "25px"}` }}
        >
          ADD CHANNEL
        </Button>
        {error && (
          <p>
            Please Login First <a href="#">Login</a>
          </p>
        )}
      </ValidatorForm>
    </Dialog>
  );
}
