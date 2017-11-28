// issue-47

const discs = {
  DiskC2C3: { top: "C2", bottom: "C3" },
  DiskC3C4: { top: "C3", bottom: "C4" },
  DiskC4C5: { top: "C4", bottom: "C5" },
  DiskC5C6: { top: "C5", bottom: "C6" },
  DiskC6C7: { top: "C6", bottom: "C7" },
  DiskC7T1: { top: "C7", bottom: "T1" },
  DiskT1T2: { top: "T1", bottom: "T2" },
  DiskT2T3: { top: "T2", bottom: "T3" },
  DiskT3T4: { top: "T3", bottom: "T4" },
  DiskT4T5: { top: "T4", bottom: "T5" },
  DiskT5T6: { top: "T5", bottom: "T6" },
  DiskT6T7: { top: "T6", bottom: "T7" },
  DiskT7T8: { top: "T7", bottom: "T8" },
  DiskT8T9: { top: "T8", bottom: "T9" },
  DiskT9T10: { top: "T9", bottom: "T10" },
  DiskT10T11: { top: "T10", bottom: "T11" },
  DiskT11T12: { top: "T11", bottom: "T12" },
  DiskT12L1: { top: "T12", bottom: "L1" },
  DiskL1L2: { top: "L1", bottom: "L2" },
  DiskL2L3: { top: "L2", bottom: "L3" },
  DiskL3L4: { top: "L3", bottom: "L4" },
  DiskL4L5: { top: "L4", bottom: "L5" },
  DiskL5S: { top: "L5", bottom: "Sacrum" }
};

export default () => {
  const distance = 0;
  const offset = 0;

  // issue-47
  // Might want o clean this up at some point.
  // Works well for now when resetting disc state,
  // but should move to reducer initial state and load default dataset
  const refactorDiscs = Object.entries(discs)
    .map(([key, v]) => [
      key,
      {
        ...v,
        data: new Array(14).fill({
          outerTop: { distance, offset },
          outerMiddle: { distance, offset },
          outerBottom: { distance, offset },
          innerTop: { distance, offset },
          innerMiddle: { distance, offset },
          innerBottom: { distance, offset }
        })
      }
    ])
    .reduce((o, [key, v]) => ({ ...o, [key]: v }), {});

  return {
    ...refactorDiscs
  };
};
