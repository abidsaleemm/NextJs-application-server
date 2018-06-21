export default props => {
  const { value, placeholder, onChange, onClear } = props;

  const shouldShowClear = !!(onClear && value);
  return (
    <div className="root">
      <style jsx>
        {`
          .root {
            padding: 5px;
            background: white;
            display: flex;
            position: relative;
            width: 100%;
            height: 100%;
            flex-direction: row;
          }

          .root button:hover {
            cursor: pointer;
          }

          .input {
            height: 30px;
            border: none;
            box-shadow: none;
            width: 100%;
            padding-right: 30px;
          }

          .input:focus {
            outline: none;
          }

          .clearButton {
            position: absolute;
            background: none;
            right: 5px;
            line-height: 0;
            width: 30px;
            height: 30px;
            border: none;
            justify-content: center;
            align-items: center;
            padding: 0;
            border-radius: 900px;
          }

          .clearButton:focus {
            background: #efefef;
            outline: none;
          }
        `}
      </style>

      <input
        className="input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {shouldShowClear ? (
        <button className="clearButton" onClick={onClear}>
          <svg
            fill="#000000"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
      ) : null}
    </div>
  );
};
