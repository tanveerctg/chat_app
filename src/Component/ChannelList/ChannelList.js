import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { CLICKED_CHANNEL } from "../../Reducer/Channel";

export default function ChannelList() {
  const { Channel } = useSelector(state => state);
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
            clickedChannelID: Channel.channels[index].id
          });
        }}
        selected={index === clickedItem}
        key={index}
      >
        <ListItemText primary={channel.name} />
      </ListItem>
    );
  });
}
