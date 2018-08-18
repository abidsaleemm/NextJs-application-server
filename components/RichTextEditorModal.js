import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Modal, ModalHeader, ModalBody, InputGroup } from "reactstrap";
import * as actions from "../actions";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const RichTextEditorModal = class extends Component {
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
      isOpen,
      studyUID,
      notes,
      header,
      setProjectProps = () => {},
      setNotesEditor = () => {}
    } = this.props;
    const {
      editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(notes))
      )
    } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        toggle={() => setNotesEditor({ isOpen: false })}
        contentClassName="modal-xl"
      >
        <ModalHeader toggle={() => setNotesEditor({ isOpen: false })}>
          {header}
        </ModalHeader>
        <ModalBody>
          <div className="root">
            <style jsx>{`
              .root {
                display: flex;
                flex-direction: column;
                border: 2px;
                padding: 3px;
                width: 700px;
                height: 500px;
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
          <Button
            color="secondary"
            onClick={() => setNotesEditor({ isOpen: false })}
          >
            Cancel
          </Button>{" "}
          <Button
            color="primary"
            onClick={() => {
              const jsonPayload = JSON.stringify(
                convertToRaw(editorState.getCurrentContent())
              );

              setProjectProps({
                studyUID,
                notes: jsonPayload
              });

              setNotesEditor({ isOpen: false });
            }}
          >
            Save
          </Button>
        </ModalBody>
      </Modal>
    );
  }
};

const mapStateToProps = ({
  notesEditor: { notes, studyUID, isOpen, header }
}) => ({
  notes,
  studyUID,
  isOpen,
  header
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RichTextEditorModal);
