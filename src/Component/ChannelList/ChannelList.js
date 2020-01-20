import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { CLICKED_CHANNEL } from "../../Reducer/Channel";

export default function ChannelList() {
  const { credentialReducer, Loading, Channel } = useSelector(state => state);
  const [clickedItem, setClickedItem] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CLICKED_CHANNEL,
      channel: Channel.channels[clickedItem]
    });
  }, [clickedItem]);
  return Channel.channels.map((channel, index) => {
    return (
      <ListItem
        button
        onClick={() => setClickedItem(index)}
        selected={index === clickedItem}
        key={index}
      >
        <ListItemText primary={channel.name} />
      </ListItem>
    );
  });
}
