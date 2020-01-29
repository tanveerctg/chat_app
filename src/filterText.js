function getFilter(messages, searchTxt = null) {
  let filtered = messages.filter(msg => {
    var patt = new RegExp(searchTxt, "gi");
    let txt;
    txt = searchTxt
      ? patt.test(msg.messages.text) || patt.test(msg.createdBy.userName)
      : true;
    if (txt) {
      return msg;
    }
  });
  return filtered;
}
export default getFilter;
