import fs from 'fs';

export default () => {
  const spinePathName = 'SpinePath';
  const filePath = `modules/spine/models/${spinePathName}.json`;
  const data = fs.readFileSync(filePath);
  let retObj = {};
  if (data) {
    const metaData = JSON.parse(data);
    retObj = { ...retObj, ...metaData };
  }

  let objArray = [];
  const recurseTree = (bone, name, parent) => {
    const { tail, children } = bone;
    const nerveRoot =
      ((name.search('.L') !== -1) ||
      (name.search('.R') !== -1));

    // Set default values
    const radius = nerveRoot ?
    { x: 0.08 * 50, y: 0.10 * 50 } : { x: 0.11 * 50, y: 0.15 * 50 };
    const radiusTail = nerveRoot ?
    { x: 0.08 * 50, y: 0.10 * 50} : { x: 0.11 * 50, y: 0.15 * 50 };
    const padding = nerveRoot ? 0.12 * 50 : 0.12 * 50;
    const paddingTail = nerveRoot ? 0.2 * 50 : 0.26 * 50;
    const offsetRoot = -0.14 * 50;
    const angle = 0;
    const vertebraRotation = {
      x: 0,
      y: 0,
      z: 0,
    };
    const vertebraOffset = {
      x: 0,
      y: 0,
      z: 0,
    };
    const vertebraScale = {
      x: 1,
      y: 1,
      z: 1,
    };

    const center = {
      x: tail.x,
      y: tail.y,
      z: tail.z,
    };

    // Make relative
    if (nerveRoot) {
      center.x = tail.x - parent.center.x;
      center.y = 0;
      center.z = 0;
      parent.offsetRoot = tail.y - parent.center.y;
    }

    // Create node
    let node = {
      name,
      radius,
      center,
      radiusTail,
      paddingTail,
      angle,
    };

    // Add non root props
    if (!nerveRoot) {
      node = {
        ...node,
        offsetRoot,
        padding,
        vertebraRotation,
        vertebraOffset,
        vertebraScale,
      };
    }

    if (nerveRoot) {
      return node;
    }

    const [childLeft] = Object.entries(children)
      .filter(([key]) => key.search('.L') >= 0)
      .map(([key, value]) => recurseTree(value, key, node));

    const [childRight] = Object.entries(children)
      .filter(([key]) => key.search('.R') >= 0)
      .map(([key, value]) => recurseTree(value, key, node));

    const [child] = Object.entries(children)
      .filter(([key]) => key.search('.R') === -1 && key.search('.L') === -1 )
      .map(([key, value]) => recurseTree(value, key, data));

    objArray = [{ ...node, childLeft, childRight }, ...objArray];
  };

  recurseTree(retObj.C1, 'C1');
  return objArray;
};
