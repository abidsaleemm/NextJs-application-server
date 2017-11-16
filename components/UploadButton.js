import classNames from "classnames";

export default ({
  studyUID = "",
  handleUpload = () => {},
  hasFiles = false, // Just styles so left side has no bevel.
  label,
  style
}) => {
  const id = `file-upload-${studyUID}`;

  return (
    <div style={style ? style : {}}>
      <style jsx>
        {`
          .label {
            padding: 0;
            margin: 0;
          }

          .input {
            display: none;
          }

          .hasFiles {
            border-radius: 0 5px 5px 0;
          }
        `}
      </style>
      <label
        htmlFor={id}
        className="label"
        style={style ? style : {}}
      >
        <div
          className={classNames({
            btn: true,
            "btn-secondary": true,
            hasFiles
          })}
          style={style ? style : {}}
        >
          {label ? label : "Upload File"}
        </div>
      </label>
      <input
        className="input"
        id={id}
        type="file"
        onChange={({ target }) => handleUpload({ target, studyUID })}
      />
    </div>
  );
};
