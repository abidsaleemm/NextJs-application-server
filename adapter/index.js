import azureAdapter from "./azure";
import localAdapter from "./local";
import dicom from "./dicom";
import projects from "./projects";
import { compose } from "ramda";

export default props => {
  const { local = false } = props;
  const enhancer = local ? localAdapter(props) : azureAdapter(props);

  return compose(
    dicom,
    projects()
  )(enhancer);
};
