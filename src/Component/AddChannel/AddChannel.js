import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import useStyles from "../../Styles/Dahboard";

export default function AddChannel() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[0]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = value => {
    setDialogOpen(false);
    setSelectedValue(value);
  };
  return (
    <div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={dialogOpen}
        onClose={handleDialogClose}
      />

      <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
      <List>
        {/* {["Add a channel"].map((text, index) => (
          <ListItem button key={text} onClick={handleDialogOpen}>
            <ListItemText primary={text} />
            <AddCircleOutlineIcon style={{ marginRight: "15px" }} />
          </ListItem>
        ))} */}
        <ListItem button onClick={handleDialogOpen}>
          <ListItemText primary="Add a channel" />
          <AddCircleOutlineIcon style={{ marginRight: "15px" }} />
        </ListItem>
      </List>
    </div>
  );
}

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const classes = useStyles();
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        {emails.map(email => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}
