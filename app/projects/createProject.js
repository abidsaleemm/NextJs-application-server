import importDiscs from '../modules/spine/importDiscs';
import importSegments from '../modules/spine/importSegments';
import importVertebra from '../modules/spine/importVertebra';

// TODO Clean this up with other modules
export default ({ studyUID }) => {
  const segments = importSegments();
  const vertebra = importVertebra(segments);
  const discs = importDiscs();

  return ({
    studyUID,
    segments,
    vertebra,
    discs,
  });
}

// TODO creates a fresh state from module