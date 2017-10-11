import react from "react";
import { Input } from "reactstrap";

export default props => {
  const { value, placeholder, onChange, onClear, muiTheme } = props;

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
                flex: 1 1 100%;
                border: none;
                box-shadow: none;
            }
            .input:focus {
                outline: none;
            }
            .input:focus": {
                outline: none;
            }
            // TODO: this doesn't select the button below???
            .clearButton {
                background: none;
                position: absolute;
                right: 5px;
                line-height: 0;
            }
            .clearButton:focus {
                background: #EFEFEF;
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
        <button
          style={{
            background: "none",
            width: "30px",
            height: "20px",
            border: "none",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            lineHeight: 0
          }}
          onClick={onClear}
        >
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
