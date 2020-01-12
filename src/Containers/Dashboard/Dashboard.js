import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import PhotoIcon from "@material-ui/icons/Photo";
import SendIcon from "@material-ui/icons/Send";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import pizza from "./pizza.png";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import AddChannel from "../../Component/AddChannel/AddChannel";
import { useSelector, useDispatch } from "react-redux";
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

function ChannelList() {
  const { credentialReducer, Loading, Channel } = useSelector(state => state);
  const [clickedItem, setClickedItem] = useState(0);
  useEffect(() => {
    console.log("CHANGEDDDDD");
  }, [clickedItem]);
  return Channel.channels.map((channel, index) => {
    return (
      <ListItem
        button
        onClick={() => setClickedItem(index)}
        selected={index === clickedItem}
      >
        <ListItemText primary={channel.name} />
      </ListItem>
    );
  });
}
function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //Menu Toggle
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = tanveer => {
    console.log(tanveer);
    setAnchorEl(null);
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
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
            Ricardo Kaka <ArrowDropDownIcon />
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
            Profile
          </MenuItem>
          <MenuItem onClick={() => handleClose("tanveer")}>My account</MenuItem>
          <MenuItem onClick={() => handleClose("tanveer")}>Logout</MenuItem>
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
          <input
            placeholder="Search Message..."
            className={classes.searchMessage}
          ></input>
          <div className={classes.bodyContent}>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <div className={classes.message}>Pizza is Very Tasty</div>
              <div className={classes.time}>9:46 PM</div>
            </div>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <div className={classes.message}>Pizza is Very Tasty</div>
              <div className={classes.time}>9:46 PM</div>
            </div>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <img src={pizza} className={classes.messagePic} />
              <div className={classes.time}>9:46 PM</div>
            </div>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <div className={classes.message}>Pizza is Very Tasty</div>
              <div className={classes.time}>9:46 PM</div>
            </div>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <div className={classes.message}>Pizza is Very Tasty</div>
              <div className={classes.time}>9:46 PM</div>
            </div>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <div className={classes.message}>Pizza is Very Tasty</div>
              <div className={classes.time}>9:46 PM</div>
            </div>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <div className={classes.message}>Pizza is Very Tasty</div>
              <div className={classes.time}>9:46 PM</div>
            </div>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <div className={classes.message}>Pizza is Very Tasty</div>
              <div className={classes.time}>9:46 PM</div>
            </div>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <div className={classes.message}>Pizza is Very Tasty</div>
              <div className={classes.time}>9:46 PM</div>
            </div>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <div className={classes.message}>Pizza is Very Tasty</div>
              <div className={classes.time}>9:46 PM</div>
            </div>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <div className={classes.message}>Pizza is Very Tasty</div>
              <div className={classes.time}>9:46 PM</div>
            </div>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <div className={classes.message}>Pizza is Very Tasty</div>
              <div className={classes.time}>9:46 PM</div>
            </div>
            <div className={classes.eachMesssage}>
              <Avatar className={classes.orange}>N</Avatar>
              <div className={classes.message}>Pizza is Very Tasty</div>
              <div className={classes.time}>9:46 PM</div>
            </div>
          </div>
          <div className={classes.typeMessageSection}>
            <div className={classes.typeMessageFirstPart}>
              <input
                placeholder="Type a message..."
                className={classes.sendMessage}
              ></input>
              <InsertEmoticonIcon />
              <PhotoIcon />
            </div>
            <SendIcon style={{ marginLeft: "5px" }} />
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
