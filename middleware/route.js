import Router from "next/router";
import { ROUTE } from "../constants/actionTypes";

export default store => next => action => {
  const { type } = action;

  if (type === ROUTE) {
    const { pathname, query } = action;
    Router.push({ pathname, query });
  }

  return next(action);
};
