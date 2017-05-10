import * as THREE from 'three';

export default (segments) => segment => {
  const {
    offsetRoot: offset,
    center,
  } = segment;

  const segmentIndex =
    segments.findIndex(v => v.name === segment.name);

  if (offset >= 0) {
    const parent = segmentIndex > 0 ?
      segments[segmentIndex - 1] : null;

    if (parent) {
      const direction = new THREE.Vector3()
        .subVectors(parent.center, center)
        .normalize()
        .multiplyScalar(offset);

      return new THREE.Vector3()
        .copy(center)
        .add(direction);
    }
    // issue-62
    // Missing?
  } else {
    const child = segmentIndex < segments.length ?
      segments[segmentIndex + 1] : null;

    if (child) {
      const direction = new THREE.Vector3()
        .subVectors(center, child.center)
        .normalize()
        .multiplyScalar(-offset);

      return new THREE.Vector3()
        .copy(center)
        .sub(direction);
    } else {
      // issue-62
      // make sure this works
    }
  }

  return new THREE.Vector3().copy(center);
};
