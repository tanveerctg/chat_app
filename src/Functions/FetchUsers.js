import { store } from "../index";
import { firebase } from "../firebase";
import { LOG_IN } from "../Reducer/Credential";

export default function FetchUsers(user) {
  firebase
    .database()
    .ref(`Users/${user.uid}`)
    .once("value")
    .then(snapshot => {
      const { name, avatarUrl, id } = snapshot.val();
      store.dispatch({
        type: LOG_IN,
        id: id,
        userName: name,
        avatarUrl: avatarUrl
      });
    });
}
