// import Router from "next/router";
import { ROUTE } from "../constants/actionTypes";

export default ({ pathname, query }) => ({
  type: ROUTE,
  pathname,
  query
});


//Router.push({ pathname, query });

// import Router from "next/router";

// export default ({ pathname, query }) => Router.push({ pathname, query });
