import io from "socket.io-client";

export default async (action = '', props = {}) => {
  const socket = io();
  return await new Promise((resolve, reject) => {
    socket.emit(
    action,
    props,
    (retProps) => {
      console.log("socket done");
      // TODO Call payload action to refresh list
      resolve(retProps);
    }
  );
})

    // const res = await fetch(
    //   '/api',
    //   {
    //     credentials: 'same-origin',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     method: "POST",
    //     body: JSON.stringify({ action, props })
    //   })
      
    // return await res.json();
};