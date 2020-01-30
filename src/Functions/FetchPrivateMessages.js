import { firebase } from "../firebase";
import { store } from "../index";
import { SET_PRIVATE_MESSAGES_NOTIFICATIONS } from "../Reducer/Private_Messages_Notifications";

export default function FetchPrivateMessages(currentUser) {
  const PrivateMessageRef = firebase.database().ref("PrivateMessages");
  const CurrentUser = currentUser.uid;

  PrivateMessageRef.on("value", snap => {
    for (let twoPersonsId in snap.val()) {
      var patt = new RegExp(`${CurrentUser}`, "g");
      // console.log("----", snap.val()[twoPersonsId][CurrentUser].Notifications);
      if (patt.test(twoPersonsId)) {
        async function setAllInfo() {
          let Messages = [];
          let RefoctoringMessages = [];
          let grabOtherPersonsId = twoPersonsId
            .replace(CurrentUser, "")
            .replace("_", "");
          let Notifications =
            snap.val()[twoPersonsId][CurrentUser].Notifications !== undefined &&
            snap.val()[twoPersonsId][CurrentUser].Notifications;

          for (let grabMessage in snap.val()[twoPersonsId]) {
            Messages.push(snap.val()[twoPersonsId][grabMessage].Messages);
          }
          Messages.forEach(msg => {
            for (let eachMsg in msg) {
              RefoctoringMessages.push(msg[eachMsg]);
            }
          });
          return { Messages, grabOtherPersonsId, Notifications };
        }

        setAllInfo().then(({ Messages, grabOtherPersonsId, Notifications }) => {
          let RefinedMessages = [];
          Messages.forEach(msg => {
            if (!!msg) {
              for (let k in msg) {
                RefinedMessages.push(msg[k]);
              }
            }
          });
          store.dispatch({
            type: SET_PRIVATE_MESSAGES_NOTIFICATIONS,
            Messages: RefinedMessages,
            OtherPersonsId: grabOtherPersonsId,
            Notifications: Notifications
          });
        });
      }
    }
  });
}
