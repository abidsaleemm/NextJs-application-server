const studyTypes = {
  Lumbar: [/lum/i, /l-spine/gi],
  Cervical: [/cervical/gi, /cer/i, /c-spine/gi, /cs/gi],
  Thoracic: [/thoracic/gi, /thoracic/i, /t-spine/gi]
};

export default ({ studyName }) => {
  const [studyType] =
    Object.entries(studyTypes).find(([k, v = []]) =>
      v.some(regex => regex.test(studyName))
    ) || [];

  return studyType ? studyType : studyName;
};
