import React, { Component } from "react";
import { Tooltip, Button } from "reactstrap";
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
    const {
      state: { confirmed = false, mouseOver = false },
      props: {
        children,
        message,
        onConfirm = () => {},
        ...props
      } = {}
    } = this;

    const toolTipID = uuid();
    const toolTipMessage = message
      ? message
      : "Click Again to Confirm";

    return (
      <div id={toolTipID} {...props}>
        {confirmed ? (
          <Tooltip placement="top" isOpen={true} target={toolTipID}>
            {toolTipMessage}
          </Tooltip>
        ) : null}

        <Button
          {...props}
          {...(confirmed ? { color: "danger" } : {})}
          onMouseOver={() => this.setState({ mouseOver: true })}
          onMouseOut={() =>
            this.setState({
              mouseOver: false,
              confirmed: false
            })}
          onClick={() => this.handleClick()}
        >
          {confirmed ? "Confirm" : children}
        </Button>
      </div>
    );
  }
}
