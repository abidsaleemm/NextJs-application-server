import { TOGGLE_SIDEBAR} from "../constants/actionTypes";

export const initialState = {
	projects: [],
};

export default ( state = { sidebarIsOpen: true }, { type } ) => {
  const { sidebarIsOpen, ...rest } = state;
  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
          ...rest,
          sidebarIsOpen: !sidebarIsOpen
      };
    default:
      return state;
  }
};