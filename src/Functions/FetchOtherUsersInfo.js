import { firebase } from "../firebase";
import { store } from "../index";
import { SET_USERS } from "../Reducer/Users";

export default function FetchOtherUsersInfo(currentUser) {
  firebase
    .database()
    .ref("Users")
    .on("value", snap => {
      let allUsers = [];
      for (let user in snap.val()) {
        let { avatarUrl, id, name } = snap.val()[user];
        if (id !== currentUser.uid) {
          allUsers.push({ avatarUrl, id, name });
        }

        store.dispatch({ type: SET_USERS, users: allUsers });
      }
    });
}
