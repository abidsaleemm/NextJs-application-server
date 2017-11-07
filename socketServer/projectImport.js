export default async ({
  socket,
  action: { studyUID = "", data = "" } = {}
}) => {
  // TODO Add better error handling around JSON parsing
  const parsedData = JSON.parse(data);

  await setProjectSnapshot({
    studyUID,
    payload: parsedData
  });

  // TODO Send a broadcast and update the editor payload


  // Update SnapShot
  // if (!studyUID) {
  //   return;
  // }

  // console.log("Resetting project to default", studyUID);

  // await socket.emit("action", fetchAction(true)); // TODO move to client

  // const project = createProject({ studyUID }); // TODO Add function to create default from existing
  // await setProjectSnapshot({
  //   studyUID,
  //   payload: project,
  //   injuryImpingement: {
  //     visible: false,
  //     labelVisible: true,
  //     opacity: 1,
  //     discs: {}
  //   }
  // });

  // await socket.emit(
  //   "action",
  //   route({ pathname: "/projectDetail", query: { studyUID } })
  // );

  // socket.emit("action", fetchAction(false));
};
