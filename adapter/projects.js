export default () => {
  // TODO Handle persisted state changes here for now but might want to cut up or move in the future.
  // TODO Create issue for this.  This will not work if running multiple servers at some point will need modifications.
  // Would be good idea to wrap this in some sort of server state management.
  let states = [];

  // TODO Use keystore to store states
  return props => {
    const {
      projects: {
        setProjectSnapshot = () => {},
        getProjectSnapshot = () => {},
        ...projectsProps
      } = {}
    } = props;

    return {
      ...props,
      projects: {
        ...projectsProps,
        setProjectSnapshot: async props => {
          const { studyUID } = props;

          console.log("setProjectSnapshot", studyUID);

          const index = states.findIndex(
            ({ key }) => studyUID === key
          );

          let { [index]: state } = states;

          // Get state snapshot again if missing

          if (!state) {
            state = await getProjectSnapshot(props);

            console.log("Saving state", state);

            states = [...states, { ...state, studyUID }];
          }

          const mergedState = { ...state, props };

          console.log("state", state, mergedState);
          //   console.log("states", states);

          // Update state with
          // TODO remerge state
          // TODO Wrap table store here?
          // TODO Capture additional nested state changes here. Try and handle this better with the editor interface.

          // Handle state changes here
          // Persist state changes

          return await setProjectSnapshot(mergedState);
        },
        getProjectSnapshot: async props => {
          const { studyUID } = props;

          // Lookup state.  Load from database if doesn't exist.
          let state = states.find(({ key }) => studyUID === key);

          console.log("getProjectSnapshot save state", state);

          if (!state) {
            state = await getProjectSnapshot(props);

            console.log("Saving state", state, studyUID);

            states = [...states, { ...state, studyUID }];
          }

          return state;
        }
      }
    };
  };
};
