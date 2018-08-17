import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Modal, ModalHeader, ModalBody, InputGroup } from "reactstrap";
import * as actions from "../actions";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";

export class RichTextEditorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  componentWillReceiveProps({ notes }) {
    this.setState({
      editorState: notes
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(notes)))
        : EditorState.createEmpty()
    });
  }

  render() {
    const {
      toggle,
      isOpen,
      setProjectProps = () => {},
      studyUID,
      notes
    } = this.props;
    const {
      editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(notes))
      )
    } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalBody>
          <div className="root">
            <style jsx>{`
              .root {
                display: flex;
                flex-direction: column;
                border: 2px;
                padding: 3px;
                width: auto;
                height: auto;
              }
            `}</style>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{" "}
          <Button
            color="primary"
            onClick={() => {
              setProjectProps({
                studyUID,
                notes: JSON.stringify(
                  convertToRaw(editorState.getCurrentContent())
                )
              }),
                toggle();
            }}
          >
            Save
          </Button>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = ({ userList }) => ({ userList });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RichTextEditorModal);
