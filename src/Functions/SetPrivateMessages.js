import React from "react";
import { firebase } from "../firebase";
import moment from "moment";
import uuidv4 from "uuid/v4";

export default function SetPrivateMessages(
  clickedChannel,
  credentialReducer,
  messages
) {
  const receiver_id = clickedChannel.id;
  const sender_id = credentialReducer.id;
  const createdBy = credentialReducer;
  const messageKey = uuidv4();
  const createdTime = moment().valueOf();
  const PrivateMessagesRef = firebase.database().ref("PrivateMessages");
  const PrivateNotificationsRef = firebase
    .database()
    .ref("PrivateNotifications");

  const data = {
    messages,
    createdBy,
    messageKey,
    createdTime
  };
  firebase
    .database()
    .ref("PrivateMessages")
    .once("value", snap => {
      if (
        snap.hasChild(`${receiver_id}_${sender_id}`) ||
        snap.hasChild(`${sender_id}_${receiver_id}`)
      ) {
        const checker = {
          sender_id_receiver_id: snap.hasChild(`${sender_id}_${receiver_id}`),
          receiver_id_sender_id: snap.hasChild(`${receiver_id}_${sender_id}`)
        };

        let rightOrder;
        for (let value in checker) {
          if (checker[value]) {
            rightOrder = value;
          }
        }
        if (rightOrder == "sender_id_receiver_id") {
          rightOrder = `${sender_id}_${receiver_id}`;
        } else {
          rightOrder = `${receiver_id}_${sender_id}`;
        }
        // console.log(rightOrder);
        firebase
          .database()
          .ref(PrivateMessagesRef)
          .child(rightOrder)
          .child(sender_id)
          .child("Messages")
          .child(messageKey)
          .set(data)
          .then(() => {
            console.log("hoise");
            let fetchChannelNotification = new Promise((resolve, reject) => {
              firebase
                .database()
                .ref(PrivateMessagesRef)
                .child(rightOrder)
                .child(receiver_id)
                .child("Notifications")
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
              firebase
                .database()
                .ref(PrivateMessagesRef)
                .child(rightOrder)
                .child(receiver_id)
                .child("Notifications")
                .update({ lastKnown, total, count });
            });
          });
      } else {
        firebase
          .database()
          .ref(PrivateMessagesRef)
          .child(`${receiver_id}_${sender_id}`)
          .child(sender_id)
          .child("Notifications")
          .set({ lastKnown: 0, total: 0, count: 0 })
          .then(() => {
            firebase
              .database()
              .ref(PrivateMessagesRef)
              .child(`${receiver_id}_${sender_id}`)
              .child(receiver_id)
              .child("Notifications")
              .set({ lastKnown: 0, total: 1, count: 1 });
          })
          .then(() => {
            firebase
              .database()
              .ref(PrivateMessagesRef)
              .child(`${receiver_id}_${sender_id}`)
              .child(sender_id)
              .child("Messages")
              .child(messageKey)
              .update(data);
          });
      }
    });
}
