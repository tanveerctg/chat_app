import { makeStyles, useTheme } from "@material-ui/core/styles";
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  searchMessage: {
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    background: "#EEEEEE",
    border: "none",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    margin: "15px 0",
    width: "400px",
    "@media (max-width:450px)": {
      width: "95%"
    }
  },
  bodyContent: {
    overflowY: "auto",
    margin: "0 20px 10px 20px",
    "@media (max-width:500px)": {
      margin: "0 10px 10px 10px"
    }
  },
  eachMesssage: {
    display: "flex",
    alignItems: "center",
    margin: "15px 0",
    "& > *": {
      marginRight: "10px"
    }
  },
  message: {
    padding: "10px 15px",
    background: "#EEEEEE",
    borderRadius: "20px"
  },
  time: {
    fontSize: "13px",
    color: "#5E5E5E"
  },
  messagePic: {
    maxWidth: "400px"
  },
  typeMessageSection: {
    width: "85%",
    position: "relative",
    margin: "0px auto 10px  auto",
    display: "flex",
    alignItems: "center",
    "@media (max-width:500px)": {
      width: "95%"
    }
  },
  typeMessageFirstPart: {
    width: "95%",
    borderRadius: "5px",
    display: "grid",
    gridTemplateColumns: "1fr auto auto",
    gridGap: "15px",
    alignItems: "center",
    paddingRight: "15px",
    background: "#EEEEEE"
  },
  sendMessage: {
    padding: "15px",
    border: "none",
    background: "#EEEEEE",
    borderRadius: "5px"
  }
}));

export default useStyles;
