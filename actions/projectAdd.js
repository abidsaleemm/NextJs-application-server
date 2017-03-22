import { PROJECT_ADD } from '../constants/actionTypes';

import importDiscs from '../modules/spine/importDiscs';
import importSegments from '../modules/spine/importSegments';
import importVertebra from '../modules/spine/importVertebra';

export default (studyUID) => {
  const segments = importSegments();
  const vertebra = importVertebra(segments);
  const discs = importDiscs();

  return ({
    type: PROJECT_ADD,
    studyUID,
    segments,
    vertebra,
    discs,
  });
}
