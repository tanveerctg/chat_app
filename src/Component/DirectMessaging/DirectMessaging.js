import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { useSelector, useDispatch } from "react-redux";
import { CLICKED_CHANNEL } from "../../Reducer/Channel";

export default function DirectMessaging() {
  const { Users, Channel } = useSelector(state => state);
  const dispatch = useDispatch();
  const [clickedItem, setClickedItem] = useState(null);
  return (
    <div>
      <List>
        <ListItem button>
          <ListItemText primary="Other Users" />
          <PeopleAltIcon style={{ marginRight: "15px" }} />
        </ListItem>
        <Divider />
        {Users.map((user, index) => {
          return (
            <ListItem
              button
              onClick={() => {
                setClickedItem(index);
                dispatch({
                  type: CLICKED_CHANNEL,
                  channel: user,
                  isPrivateChannel: true
                });
              }}
              selected={Channel.isPrivateChannel && index === clickedItem}
              key={index}
            >
              <ListItemText secondary={user.name} />{" "}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
