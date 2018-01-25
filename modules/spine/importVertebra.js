import { Vector2, Vector3 } from "three";
import fs from "fs";
import sortVertexGroups from "./sortVertexGroups";

export default (segments = []) =>
  segments.map(segment => importVertebra(segment));

// issue-65
const importVertebra = ({ name: objectName, center }) => {
  const filePath = `modules/spine/models/${objectName}.json`;
  const data = fs.readFileSync(filePath);
  if (data) {
    const parsed = JSON.parse(data);
    const { vertices, faces, uvs } = parsed;

    let { vertexGroups } = parsed;

    // Clean this up with better functional methods
    let i = 0;
    const len = uvs.length;
    const faceUvs = [];

    while (i < len) {
      const fi = [];
      fi.push(new Vector2(uvs[i + 2][0], uvs[i + 2][1]));

      fi.push(new Vector2(uvs[i + 1][0], uvs[i + 1][1]));

      fi.push(new Vector2(uvs[i][0], uvs[i][1]));

      faceUvs.push(fi);
      i += 3;
    }

    // issue-64
    const {
      disc_bottom_inner,
      disc_bottom_outer,
      disc_top_inner,
      disc_top_outer
    } = vertexGroups;

    // issue-64
    vertexGroups = sortVertexGroups({
      vertices,
      faces,
      vertexGroups: {
        discBottomInner: disc_bottom_inner,
        discBottomOuter: disc_bottom_outer,
        discTopInner: disc_top_inner,
        discTopOuter: disc_top_outer
      }
    });

    // issue-64
    const {
      discBottomInner,
      discBottomOuter,
      discTopInner,
      discTopOuter
    } = vertexGroups;

    // Use functional methods
    let discVertexGroups = [];
    for (let j = 0; j < 14; j += 1) {
      let v = {};
      v =
        discBottomInner !== undefined
          ? { ...v, discBottomInner: discBottomInner[j] }
          : { ...v };
      v =
        discBottomOuter !== undefined
          ? { ...v, discBottomOuter: discBottomOuter[j] }
          : { ...v };
      v =
        discTopInner !== undefined
          ? { ...v, discTopInner: discTopInner[j] }
          : { ...v };
      v =
        discTopOuter !== undefined
          ? { ...v, discTopOuter: discTopOuter[j] }
          : { ...v };

      discVertexGroups = [...discVertexGroups, v];
    }

    // Build mirror list
    const mirrorList = vertices.reduce((a = [], v, i) => {
      if (v[0] === 0) {
        return a;
      }

      // Skip matches
      if (a.some(([vi1, vi2]) => vi1 === i || vi2 === i)) {
        return a;
      }

      // Find Match
      const foundIndex = vertices.findIndex(([x, y, z]) => {
        return (
          new Vector3(-x, y, z).distanceTo(
            new Vector3().fromArray(v)
          ) < 0.0001
        );
      });

      return foundIndex !== -1 ? [...a, [i, foundIndex]] : a;
    }, []);

    // TODO Checking all non mirror and flag if non zero
    const nonMirrorList = vertices.reduce((a, v, i) => {
      if (v[0] === 0) {
        return a;
      }

      return !mirrorList.some(([i1, i2]) => i1 === i || i2 === i)
        ? [...a, { i, v }]
        : a;
    }, []);

    if (nonMirrorList.length > 0) {
      console.log(
        "Error Object not semetric",
        objectName,
        nonMirrorList
      );
    }

    return {
      faces: faces.map(([a, b, c]) => ({ a, b, c })),
      // faceUvs: [faceUvs],
      faceUvs,
      vertices: vertices.map(([x, y, z]) => ({ x, y, z })),
      visible: true,
      discVertexGroups,
      name: objectName,
      position: center,
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      mirrorList
    };
  }
};
