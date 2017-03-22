import * as THREE from 'three';
import fs from 'fs';
import sortVertexGroups from './sortVertexGroups';

export default (segments = []) =>
  segments
    .map(({ name }) => importVertebra(name))

// issue-65
const importVertebra = (objectName) => {
  const filePath = `modules/spine/models/${objectName}.json`;
  const data = fs.readFileSync(filePath);
  if (data) {
    const parsed = JSON.parse(data);
    const {
      vertices,
      faces,
      uvs,
    } = parsed;

    let { vertexGroups } = parsed;

    // Clean this up with better functional methods
    let i = 0;
    const len = uvs.length;
    const faceUvs = [];

    while (i < len) {
      const fi = [];
      fi.push(
        new THREE.Vector2(
          uvs[i + 2][0],
          uvs[i + 2][1]
        )
      );

      fi.push(
        new THREE.Vector2(
          uvs[i + 1][0],
          uvs[i + 1][1]
        )
      );

      fi.push(
        new THREE.Vector2(
          uvs[i][0],
          uvs[i][1]
        )
      );

      faceUvs.push(fi);
      i += 3;
    }

    // issue-64
    const {
      disc_bottom_inner,
      disc_bottom_outer,
      disc_top_inner,
      disc_top_outer,
    } = vertexGroups;

    // issue-64
    vertexGroups = sortVertexGroups({
      vertices,
      faces,
      vertexGroups: {
        discBottomInner: disc_bottom_inner,
        discBottomOuter: disc_bottom_outer,
        discTopInner: disc_top_inner,
        discTopOuter: disc_top_outer,
      },
    });

    // issue-64
    const {
      discBottomInner,
      discBottomOuter,
      discTopInner,
      discTopOuter,
    } = vertexGroups;

    // Use functional methods
    let discVertexGroups = [];
    for (let j = 0; j < 14; j += 1) {
      let v = {};
      v = discBottomInner !== undefined ?
        { ...v, discBottomInner: discBottomInner[j] } : { ...v };
      v = discBottomOuter !== undefined ?
        { ...v, discBottomOuter: discBottomOuter[j] } : { ...v };
      v = discTopInner !== undefined ?
        { ...v, discTopInner: discTopInner[j] } : { ...v };
      v = discTopOuter !== undefined ?
        { ...v, discTopOuter: discTopOuter[j] } : { ...v };

      discVertexGroups = [
        ...discVertexGroups,
        v,
      ];
    }

    return {
      faces: faces.map(([a, b, c]) => ({ a, b, c })),
      // faceUvs: [faceUvs],
      faceUvs,
      vertices: vertices.map(([x, y, z]) => ({ x, y, z })),
      visible: true,
      // vertexGroups,
      discVertexGroups,
      // position: { x: 0, y: 0, z: 0 }, // TODO add these back in
      // rotation: { x: 0, y: 0, z: 0 }, // TODO add matrix instead
      name: objectName,
    };
  }
};
