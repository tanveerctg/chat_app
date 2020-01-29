import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { CLICKED_CHANNEL } from "../../Reducer/Channel";
import Badge from "@material-ui/core/Badge";
import { firebase } from "../../firebase";
import { store } from "../../index";

function clearNotifications(userId, channelId) {
  const NotificationsRef = firebase.database().ref("Notifications");
  NotificationsRef.child(userId)
    .child(channelId)
    .set({ count: 0, lastKnown: 0, total: 0 });
}

export default function ChannelList() {
  const { Channel, Messages, Notifications, credentialReducer } = useSelector(
    state => state
  );

  if (Channel.channels.length > 0 && credentialReducer.id) {
    Channel.channels.forEach(channel => {
      if (channel.id == Channel.clickedChannel.id) {
        clearNotifications(credentialReducer.id, channel.id);
      }
    });
  }

  const [clickedItem, setClickedItem] = useState(0);
  const dispatch = useDispatch();

  return Channel.channels.map((channel, index) => {
    return (
      <ListItem
        button
        onClick={() => {
          setClickedItem(index);
          dispatch({
            type: CLICKED_CHANNEL,
            channel: Channel.channels[index],
            clickedChannelID: Channel.channels[index].id,
            isPrivateChannel: false
          });

          clearNotifications(credentialReducer.id, channel.id);
        }}
        selected={!Channel.isPrivateChannel && index === clickedItem}
        key={index}
      >
        <ListItemText secondary={channel.name} />{" "}
        <Badge
          badgeContent={
            Notifications[channel.id] && Notifications[channel.id].count
          }
          color="secondary"
        ></Badge>
      </ListItem>
    );
  });
}
