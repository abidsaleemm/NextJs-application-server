export default () => {
  // TODO Handle persisted state changes here for now but might want to cut up or move in the future.
  // TODO Create issue for this.  This will not work if running multiple servers at some point will need modifications.
  // Would be good idea to wrap this in some sort of server state management.
  let cachedStates = [];

  const updateCachedState = ({ studyUID, payload }) => {
    const index = cachedStates.findIndex(({ key }) => studyUID === key);

    cachedStates =
      index > -1
        ? [...cachedStates.slice(0, index), { ...payload, studyUID }, ...cachedStates.slice(index + 1)]
        : cachedStates;
  };

  const getCachedState = ({ studyUID }) => cachedStates.find(({ key }) => studyUID === key);

  // TODO Use keystore to store states
  return props => {
    const { projects: { setProjectSnapshot = () => {}, getProjectSnapshot = () => {}, ...projectsProps } = {} } = props;

    return {
      ...props,
      projects: {
        ...projectsProps,
        setProjectSnapshot: async ({ studyUID, cache = true, payload, ...props }) => {
          let state = getCachedState({ studyUID });

          state = !state ? (await getProjectSnapshot({ ...props, studyUID })) || {} : state;

          const mergedPayload = { ...state, ...payload, studyUID };

          if (cache) {
            updateCachedState({ payload: mergedPayload, studyUID });
          }

          return await setProjectSnapshot({
            ...props,
            payload: mergedPayload,
            studyUID
          });
        },
        getProjectSnapshot: async ({ studyUID, cache = true, ...props }) => {
          let state = getCachedState({ studyUID });
          state = !state ? await getProjectSnapshot({ ...props, studyUID }) : state;

          if (cache) {
            updateCachedState({ studyUID, state });
          }

          return state;
        }
      }
    };
  };
};
