import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import pizza from "./pizza.png";
import moment from "moment";
import filterText from "../../filterText";
//CSS
import useStyles from "../../Styles/Dahboard";

function AllMessages({ Messages }) {
  const classes = useStyles();
  const { Channel, FilterMessage, credentialReducer } = useSelector(
    state => state
  );
  const [channelMessage, setChannelMessage] = useState([]);

  let { id, createdBy } = { ...Channel.clickedChannel };

  // let channelMessage = Messages[id];
  useEffect(() => {
    setChannelMessage(Messages[id]);
  }, [Messages[id] && Messages[id].length]);

  let filteredMessages;
  if (channelMessage) {
    filteredMessages = filterText(
      channelMessage.sort((a, b) => a.createdTime - b.createdTime),
      FilterMessage
    );
  }
  console.log(filteredMessages);

  return (
    <div className={classes.bodyContent}>
      {channelMessage &&
        filteredMessages.map((msg, index) => {
          return (
            <div className={classes.eachMesssage} key={index}>
              <div className={classes.time}>
                {moment(msg.createdTime).fromNow()}
              </div>
              <div className={classes.avatar_message}>
                <Avatar
                  className={classes.avatar}
                  src={msg.createdBy.avatarUrl}
                ></Avatar>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    position: "relative",
                    width: "100%"
                  }}
                >
                  {msg.messages.text && (
                    <div
                      className={classes.message}
                      style={{
                        marginBottom: `${msg.messages.imgs ? 10 : 0}px`,
                        color:
                          credentialReducer.id == msg.createdBy.id
                            ? "white"
                            : "#333333",
                        backgroundColor:
                          credentialReducer.id == msg.createdBy.id
                            ? "#0084ff"
                            : "#EEEEEE"
                      }}
                    >
                      {msg.messages.text}
                    </div>
                  )}
                  <div
                    style={{
                      display: "grid",
                      width: "100%",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 250px))",
                      gridGap: "10px",
                      paddingRight: "10px",
                      gridAutoRows: "200px",
                      justifyItems: "start"
                    }}
                  >
                    {msg.messages.imgs &&
                      msg.messages.imgs.map((img, index) => (
                        <img
                          src={img.url}
                          className={classes.messagePic}
                          key={index}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default AllMessages;
