import { convertFromRaw } from "draft-js";

export default notes => {
  if (notes !== "") return !!convertFromRaw(JSON.parse(notes)).getPlainText();
  else return false;
};
