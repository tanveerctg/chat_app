import moment from "moment";
import uuidv4 from "uuid/v4";
import { firebase } from "../firebase";

export default function SetPublicMessages(
  Channel,
  credentialReducer,
  messages
) {
  const channelId = Channel.clickedChannel.id;
  const createdBy = credentialReducer;
  const messageKey = uuidv4();
  const createdTime = moment().valueOf();
  const MessagesRef = firebase.database().ref("Messages");
  const NotificationsRef = firebase.database().ref("Notifications");

  const data = {
    messages,
    createdBy,
    messageKey,
    channelId,
    createdTime
  };
  MessagesRef.child(channelId)
    .child(messageKey)
    .set(data);

  // Set Notifications

  NotificationsRef.once("value", userSnap => {
    for (let user in userSnap.val()) {
      if (user !== createdBy.id) {
        NotificationsRef.child(user).once("value", channelSnap => {
          if (channelSnap.hasChild(channelId)) {
            // SECOND TIME
            let fetchChannelNotification = new Promise((resolve, reject) => {
              NotificationsRef.child(user)
                .child(channelId)
                .once("value", snap => {
                  const lastKnown = snap.val().lastKnown;
                  const total = snap.val().total;
                  const count = snap.val().count;
                  resolve({ lastKnown, total, count });
                });
            });
            fetchChannelNotification.then(data => {
              const lastKnown = data.lastKnown;
              const total = data.total + 1;
              const count = total - lastKnown;
              NotificationsRef.child(user)
                .child(channelId)
                .update({ lastKnown, total, count });
            });
          } else {
            //FIRST TIME
            NotificationsRef.child(user)
              .child(channelId)
              .update({
                lastKnown: 0,
                total: 1,
                count: 1
              });
          }
        });
      }
    }
  });
}
