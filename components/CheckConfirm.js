import React, { Component } from "react";
import { Tooltip } from "reactstrap";
import uuid from "uuid";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
      mouseOver: false
    };
  }

  handleClick() {
    const {
      state: { confirmed = false },
      props: { onConfirm = () => {} }
    } = this;

    if (confirmed) {
      this.setState({ confirmed: false });
      onConfirm();
      return;
    }

    this.setState({ confirmed: true });
  }

  render() {
    const { state: { confirmed = false, mouseOver = false } } = this;

    const toolTipID = uuid();

    return (
      <div id={toolTipID}>
        <style jsx>
          {`
            .checkButton {
              cursor: pointer;
            }

            .checkBox {
              fill: none;
            }

            .checkBoxHover {
              fill: gray;
            }

            .checkBoxConfirmed {
              fill: red;
            }
          `}
        </style>
        {confirmed ? (
          <Tooltip placement="top" isOpen={true} target={toolTipID}>
            Click Again to Confirm
          </Tooltip>
        ) : null}

        <svg
          className="checkButton"
          fill="#000000"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          onMouseOver={() => this.setState({ mouseOver: true })}
          onMouseOut={() =>
            this.setState({
              mouseOver: false,
              confirmed: false
            })}
          onClick={() => this.handleClick()}
        >
          <path
            className={
              confirmed
                ? "checkBoxConfirmed"
                : mouseOver ? "checkBoxHover" : "checkBox"
            }
            d="M0 0h24v24H0z"
            stroke="black"
          />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </div>
    );
  }
}
