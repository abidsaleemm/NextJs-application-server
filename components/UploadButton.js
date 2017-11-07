export default ({
  studyUID = "",
  handleUpload = () => {},
  hasFiles = false // Just styles so left side has no bevel.
}) => {
  const id = `file-upload-${studyUID}`;

  return (
    <div>
      <label htmlFor={id} style={{ padding: 0, margin: 0 }}>
        <div
          className="btn btn-secondary"
          style={hasFiles ? { borderRadius: "0 5px 5px 0" } : {}}
        >
          Upload File
        </div>
      </label>
      <input
        style={{ display: "none" }}
        id={id}
        type="file"
        onChange={({ target }) => handleUpload({ target, studyUID })}
      />
    </div>
  );
};
