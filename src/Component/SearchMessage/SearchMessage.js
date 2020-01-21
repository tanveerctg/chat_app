import React, { useState } from "react";
import useStyles from "../../Styles/Dahboard";
import { FILTER_MESSAGE } from "../../Reducer/FilterMessage";
import { useDispatch } from "react-redux";

export default function SearchMessage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchMessageHandler = e => {
    dispatch({ type: FILTER_MESSAGE, filterText: e.target.value });
  };
  return (
    <input
      placeholder="Search Message..."
      className={classes.searchMessage}
      onChange={searchMessageHandler}
    ></input>
  );
}
