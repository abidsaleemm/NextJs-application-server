import fs from "fs";

const spinePathName = "SpinePath";
const filePath = `modules/spine/models/${spinePathName}.json`;
const numRadiusSegments = 16;

export default () => {
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
      name.search(".L") !== -1 || name.search(".R") !== -1;

    // TODO We adding this in later?
    const angle = 0;

    const center = {
      x: tail.x,
      y: tail.y,
      z: tail.z
    };

    // Make relative
    if (nerveRoot) {
      center.x = tail.x - parent.center.x;
      center.y = 0;
      center.z = 0;
    }

    // Create node
    let node = {
      name,
      center,
      angle
    };

    // Add non root props
    if (!nerveRoot) {
      node = {
        ...node
      };
    }

    if (nerveRoot) {
      return node;
    }

    const [childLeft] = Object.entries(children)
      .filter(([key]) => key.search(".L") >= 0)
      .map(([key, value]) => recurseTree(value, key, node));

    const [childRight] = Object.entries(children)
      .filter(([key]) => key.search(".R") >= 0)
      .map(([key, value]) => recurseTree(value, key, node));

    const [child] = Object.entries(children)
      .filter(
        ([key]) => key.search(".R") === -1 && key.search(".L") === -1
      )
      .map(([key, value]) => recurseTree(value, key, data));

    objArray = [{ ...node, childLeft, childRight }, ...objArray];
  };

  recurseTree(retObj.C1, "C1");
  return objArray;
};
