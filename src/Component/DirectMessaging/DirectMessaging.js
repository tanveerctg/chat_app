import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { useSelector, useDispatch } from "react-redux";
import { CLICKED_CHANNEL } from "../../Reducer/Channel";
import Badge from "@material-ui/core/Badge";
import { firebase } from "../../firebase";

function clearPublicNotifications(userId, otherPersonsId) {
  const id = `${userId}_${otherPersonsId}`;
  firebase
    .database()
    .ref("PrivateMessages")
    .once("value", snap => {
      if (
        snap.hasChild(`${userId}_${otherPersonsId}`) ||
        snap.hasChild(`${otherPersonsId}_${userId}`)
      ) {
        const checker = {
          userId_otherPersonsId: snap.hasChild(`${userId}_${otherPersonsId}`),
          otherPersonsId_userId: snap.hasChild(`${otherPersonsId}_${userId}`)
        };

        let rightOrder;
        for (let value in checker) {
          if (checker[value]) {
            rightOrder = value;
          }
        }
        if (rightOrder == "userId_otherPersonsId") {
          rightOrder = `${userId}_${otherPersonsId}`;
        } else {
          rightOrder = `${otherPersonsId}_${userId}`;
        }

        firebase
          .database()
          .ref("PrivateMessages")
          .child(rightOrder)
          .child(userId)
          .child("Notifications")
          .set({ count: 0, lastKnown: 0, total: 0 });
      }
    });
}

function DirectMessaging() {
  const { Users, Channel, credentialReducer, PrivateMessages } = useSelector(
    state => state
  );
  const dispatch = useDispatch();
  const [clickedItem, setClickedItem] = useState(null);

  if (Channel.clickedChanne && PrivateMessages[Channel.clickedChannel.id]) {
    Users.forEach(user => {
      if (user.id == Channel.clickedChannel.id) {
        clearPublicNotifications(credentialReducer.id, user.id);
      }
    });
  }
  return (
    <div>
      <List>
        <ListItem button>
          <ListItemText primary="Other Users" />
          <PeopleAltIcon style={{ marginRight: "15px" }} />
        </ListItem>
        <Divider />
        {Users.map((user, index) => {
          const getNotification =
            PrivateMessages[user.id] && PrivateMessages[user.id].Notifications;

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
                clearPublicNotifications(credentialReducer.id, user.id);
              }}
              selected={Channel.isPrivateChannel && index === clickedItem}
              key={index}
            >
              <ListItemText secondary={user.name} />{" "}
              <Badge
                badgeContent={PrivateMessages[user.id] && getNotification.count}
                color="secondary"
              ></Badge>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
export default React.memo(DirectMessaging);
