import { NOTES_EDITOR } from "../constants/actionTypes";

const initialState = () => ({
  isOpen: false,
  notes: "",
  header: null,
  studyUID: undefined
});

export default (
  state = initialState(),
  { type, header, notes, studyUID, isOpen }
) => {
  switch (type) {
    case NOTES_EDITOR:
      return {
        header: header !== undefined ? header : state.header,
        notes: notes !== undefined ? notes : state.notes,
        studyUID: studyUID !== undefined ? studyUID : state.studyUID,
        isOpen: isOpen !== undefined ? isOpen : state.isOpen
      };
    default:
      return state;
  }
};
