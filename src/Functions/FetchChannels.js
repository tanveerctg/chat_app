import { firebase } from "../firebase";
import { store } from "../index";
import { SET_INITIAL_CHANNEL } from "../Reducer/Channel";
import { LOADING_OFF } from "../Reducer/LoadingReducer";

export default function FetchChannels() {
  firebase
    .database()
    .ref("Channels")
    .on("value", snapshot => {
      let allChannels = [];
      for (let k in snapshot.val()) {
        for (let d in snapshot.val()[k]) {
          allChannels.push(snapshot.val()[k][d]);
        }
      }
      store.dispatch({
        type: SET_INITIAL_CHANNEL,
        allChannels: [...allChannels],
        clickedChannel: [...allChannels][0]
      });
      store.dispatch({ type: LOADING_OFF });
    });
}
