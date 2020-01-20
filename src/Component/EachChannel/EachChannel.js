import React, { useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function EachChannel({ channel, setClickHandler, clickedItem, index }) {
  useEffect(() => {
    console.log(channel.id);
  }, []);
  return (
    <ListItem
      button
      onClick={() => setClickHandler(index)}
      selected={index === clickedItem}
    >
      <ListItemText primary={channel.name} />
    </ListItem>
  );
}
export default EachChannel;
