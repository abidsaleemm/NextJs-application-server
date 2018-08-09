import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";

export class ToggleItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ItemsStatus: props.data.map((item) => (item.isSelected)),
      selectedItems: [],
    };

    console.log(props);
  }

  handleClick = (index, Item) => () => {
    const { ItemsStatus, selectedItems } = this.state;
    ItemsStatus[index] = !ItemsStatus[index];
    if (ItemsStatus[index] && !selectedItems.includes(Item)) {
      this.setState({ selectedItems: [...selectedItems, Item] });
    } else {
      const array = [...selectedItems];
      const idx = array.indexOf(Item);
      array.splice(idx, 1);
      this.setState({ selectedItems: array });
    }

    this.setState({ ItemsStatus });
  }

  render() {
    const {
      data,
    } = this.props;
    const { ItemsStatus } = this.state;

    return (
      <div>
        <style jsx>
        {`
        .toggle-Item {
          display: inline-block;
          margin: 10px 15px 10px 0;
          padding: 5px 15px;
          background: white;
          border: 1px solid #6c757d;
          border-radius: 5px;
          text-align: center;
          font-size: 16px;
          font-weight: 500;
        }

        .toggle-Item:hover {
            cursor: pointer;
          }

        .toggle-Item-clicked {
            background-color: #6c757d;
            color: white;
          }

        `}
      </style>
        {data.map((item, index) => (
          <div
            key={`item_${index}`}
            className={`toggle-Item ${ItemsStatus[index] ? 'toggle-Item-clicked' : 'toggle-off'}`}
            onClick={this.handleClick(index, item.title)}
          >
            {item.title}
          </div>
        ))}
        
      </div>
    );
  }
}

const mapStateToProps = ({ userList }) => ({ userList });

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleItems);
