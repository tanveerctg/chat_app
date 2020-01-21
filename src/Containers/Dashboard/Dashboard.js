import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import PhotoIcon from "@material-ui/icons/Photo";
import SendIcon from "@material-ui/icons/Send";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddChannel from "../../Component/AddChannel/AddChannel";
import ChannelList from "../../Component/ChannelList/ChannelList";
import { useSelector, useDispatch } from "react-redux";
import { firebase } from "../../firebase";
import Picker from "emoji-picker-react";
import Popover from "@material-ui/core/Popover";
import DeleteIcon from "@material-ui/icons/Delete";
import uuidv4 from "uuid/v4";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import AllMessages from "../../Component/AllMessages/AllMessages";
import SearchMessage from "../../Component/SearchMessage/SearchMessage";

//CSS
import useStyles from "../../Styles/Dahboard";

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge);

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { credentialReducer, Loading, Channel } = useSelector(state => state);
  const [chosenEmoji, setChosenEmoji] = useState([]);
  const [allEmoji, setAllEmoji] = useState([]);
  const [message, setMessage] = useState("");
  const [picSelected, setPicSelected] = useState(false);
  const [picUpload, setPicUpload] = useState(null);
  const [picName, setPicName] = useState(null);
  const [picUrl, setPicUrl] = useState(null);
  const [allPics, setAllPics] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const MessagesRef = firebase.database().ref("Messages");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //Menu Toggle
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = tanveer => {
    setAnchorEl(null);
  };

  //EMOJI POPOVER
  const [anchorEmoji, setAnchorEmoji] = useState(null);

  const handleEmojiOpen = event => {
    setAnchorEmoji(event.currentTarget);
  };

  const handleEmojiClose = () => {
    setAnchorEmoji(null);
  };

  const open = Boolean(anchorEmoji);
  const id = open ? "simple-popover" : undefined;

  //EMOJI PICKER
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(chosenEmoji.push(emojiObject));
    let joinAllEmoji = chosenEmoji.map(emoji => emoji.emoji).join("");
    setMessage(`${message}${joinAllEmoji}`);
    setChosenEmoji([]);
  };

  //TYPE_MESSAGE_HANDLER
  const typeMessageHandler = e => {
    setMessage(e.target.value);
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {})
      .catch(function(error) {
        // An error happened.
      });
  };
  const picUploadHandler = e => {
    // setPicUpload(e.target.files[0]);
    const path = Channel.clickedChannel.publicChannel ? "public" : "private";
    const uuid = uuidv4() + path;
    setLoading(true);
    if (path) {
      firebase
        .storage()
        .ref(`${path}/${uuid}`)
        .put(e.target.files[0])
        .on(
          "state_changed",
          snapshot => {},
          e => {
            console.log(e);
          },
          () => {
            firebase
              .storage()
              .ref(`${path}/${uuid}`)
              .getDownloadURL()
              .then(name => {
                // setAllPics([allPics, last_Element]);
                setPicUrl(name);
                setAllPics([
                  ...allPics,
                  { id: uuid, url: name, loading: true }
                ]);
                setLoading(false);
              });
          }
        );
    }

    // console.log(mime.getType(e.target.files[0].name));
  };
  const deletePicHandler = id => {
    setAllPics(allPics.filter(elm => elm.id !== id));
    const str = id;
    const regex = RegExp("public", "gi");
    if (regex.test(str)) {
      firebase
        .storage()
        .ref(`public/${id}`)
        .delete()
        .then(() => {})
        .catch(function(error) {
          // Uh-oh, an error occurred!
        });
    } else {
      firebase
        .storage()
        .ref(`private/${id}`)
        .delete()
        .then(() => {})
        .catch(function(error) {
          // Uh-oh, an error occurred!
        });
    }
  };
  const sendMessage = () => {
    let messages = {
      text: message,
      imgs: allPics
    };
    const channelId = Channel.clickedChannel.id;
    const createdBy = credentialReducer;
    const messageKey = uuidv4();
    const createdTime = moment().valueOf();
    const data = {
      messages,
      createdBy,
      messageKey,
      channelId,
      createdTime
    };

    MessagesRef.child(channelId)
      .child(messageKey)
      .set(data);

    dispatch({ type: "ADD_MESSAGE", data: data });
    setMessage([]);
    setAllPics([]);
  };
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <div style={{ padding: "0 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: "16px",
            height: "32px"
          }}
        >
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src={credentialReducer.avatarUrl} />
          </StyledBadge>
          <div
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0 10px",
              cursor: "pointer"
            }}
          >
            {credentialReducer.userName} <ArrowDropDownIcon />
          </div>
        </div>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleClose("tanveer")} disabled>
            Signed in as {credentialReducer.userName}
          </MenuItem>
          <MenuItem onClick={() => handleClose("tanveer")}>My account</MenuItem>
          <MenuItem onClick={signOut}>Logout</MenuItem>
        </Menu>
      </div>
      <List>
        <AddChannel />
        <ChannelList />
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="white"
        style={{ boxShadow: "none", background: "#EEEEEE" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h4"
            noWrap
            style={{ fontWeight: "700px", color: "#222222" }}
          >
            Let's Chat
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
            setClickedItem={s => console.log(s)}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main
        className={classes.content}
        style={{
          background: "white",
          padding: "0px",
          height: "91.5vh"
        }}
      >
        <div className={classes.toolbar} />
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            height: "100%"
          }}
        >
          <SearchMessage />
          <AllMessages />
          <div>
            <div
              style={{ display: "flex", marginLeft: "15px", flexWrap: "wrap" }}
            >
              {!loading ? (
                allPics.map(({ id, url }) => (
                  <div className={classes.selectedPicContainer} key={id}>
                    <img src={url} className={classes.selectedPic} />
                    <DeleteIcon
                      className={classes.deleteIcon}
                      onClick={() => deletePicHandler(id)}
                    />
                  </div>
                ))
              ) : (
                <div
                  style={{
                    height: "100px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <CircularProgress color="secondary" />
                </div>
              )}
            </div>
            <div className={classes.typeMessageSection}>
              <div className={classes.typeMessageFirstPart}>
                <input
                  placeholder="Type a message..."
                  className={classes.sendMessage}
                  onChange={typeMessageHandler}
                  value={message}
                  style={{ fontSize: "16px" }}
                ></input>
                <InsertEmoticonIcon onClick={handleEmojiOpen} />
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEmoji}
                  onClose={handleEmojiClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                >
                  <Picker onEmojiClick={onEmojiClick} />
                </Popover>
                <input
                  id="outlined-button-file"
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={picUploadHandler}
                />
                <label htmlFor="outlined-button-file">
                  <PhotoIcon />
                </label>
              </div>
              {!loading && (message.length > 0 || allPics.length > 0) && (
                <SendIcon
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={sendMessage}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

export default ResponsiveDrawer;
