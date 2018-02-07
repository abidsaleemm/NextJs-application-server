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

    // Using 8 point array
    const radius = nerveRoot ? new Array(8).fill(0.08 * 50) : new Array(8).fill(0.11 * 50);
    const radiusTail = nerveRoot ? new Array(8).fill(0.08 * 50) : new Array(8).fill(0.11 * 50);

    // TODO Should padding also be array?
    const padding = nerveRoot ? 0.12 * 50 : 0.12 * 50;
    const paddingTail = nerveRoot ? 0.2 * 50 : 0.26 * 50;
    const angle = 0;
    const angleTail = 0;

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
      center,
      radius,
      radiusTail,
      padding,
      paddingTail,
      angle,
      angleTail,
    };

    // Add non root props
    if (!nerveRoot) {
      node = {
        ...node,
        paddingTail,
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
