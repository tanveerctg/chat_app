import React, { useEffect, useState, useMemo } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import pizza from "./pizza.png";
import moment from "moment";
import filterText from "../../filterText";
//CSS
import useStyles from "../../Styles/Dahboard";

function AllMessages({ channelId }) {
  const classes = useStyles();
  const { Messages, Channel, FilterMessage } = useSelector(state => state);
  const [channelMessage, setChannelMessage] = useState([]);

  let { id, createdBy } = { ...Channel.clickedChannel };

  useEffect(() => {
    setChannelMessage(Messages[id]);
  }, Messages[id]);
  useMemo(
    () => () => {
      setChannelMessage(
        Messages[id].sort((a, b) => b.createdTime - a.createdTime)
      );
    },
    Messages[id]
  );
  let filteredMessages;
  if (channelMessage) {
    filteredMessages = filterText(
      channelMessage.sort((a, b) => a.createdTime - b.createdTime),
      FilterMessage
    );
  }

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
                        marginBottom: `${msg.messages.imgs ? 10 : 0}px`
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
export default React.memo(AllMessages);

//  <div className={classes.eachMesssage}>
//     <div className={classes.time}>9:46 PM</div>
//     <div className={classes.avatar_message} >
//       <Avatar className={classes.avatar}>N</Avatar>
//        <div className={classes.message}>Jlasfd</div>
//       <div style={{display:"grid",gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",gridGap:"10px"}}>
//       <img src={pizza} className={classes.messagePic} />
//       <img src={pizza} className={classes.messagePic} />
//        <img src={pizza} className={classes.messagePic} />
//       </div>

//     </div>
