const matMesh = new THREE.MeshPhongMaterial({
  // color: new THREE.Color(0xffffff),
  vertexColors: THREE.VertexColors,
  // wireframe: true,
  // shading: THREE.FlatShading,
});

const matLine = new THREE.LineBasicMaterial({
  color: 0x0000ff,
});

const objectList = {
  'C1': {},
  'C2': {},
  'C3': {},
  'C4': {},
  'C5': {},
  'C6': {},
  'C7': {},
  'T1': {},
  'T2': {},
  'T3': {},
  'T4': {},
  'T5': {},
  'T6': {},
  'T7': {},
  'T8': {},
  'T9': {},
  'T10': {},
  'T11': {},
  'T12': {},
  'L1': {},
  'L2': {},
  'L3': {},
  'L4': {},
  'L5': {},
  'Sacrum': {},
  'SpinePath': {},
};

const objectListBuild = {
  // 'DiskC1C2': { func: 'discFunc', top: 'C1', bottom: 'C2' },
  'DiskC2C3': { func: 'discFunc', top: 'C2', bottom: 'C3' },
  'DiskC3C4': { func: 'discFunc', top: 'C3', bottom: 'C4' },
  'DiskC4C5': { func: 'discFunc', top: 'C4', bottom: 'C5' },
  'DiskC5C6': { func: 'discFunc', top: 'C5', bottom: 'C6' },
  'DiskC6C7': { func: 'discFunc', top: 'C6', bottom: 'C7' },
  'DiskC7T1': { func: 'discFunc', top: 'C7', bottom: 'T1' },
  'DiskT1T2': { func: 'discFunc', top: 'T1', bottom: 'T2' },
  'DiskT2T3': { func: 'discFunc', top: 'T2', bottom: 'T3' },
  'DiskT3T4': { func: 'discFunc', top: 'T3', bottom: 'T4' },
  'DiskT4T5': { func: 'discFunc', top: 'T4', bottom: 'T5' },
  'DiskT5T6': { func: 'discFunc', top: 'T5', bottom: 'T6' },
  'DiskT6T7': { func: 'discFunc', top: 'T6', bottom: 'T7' },
  'DiskT7T8': { func: 'discFunc', top: 'T7', bottom: 'T8' },
  'DiskT8T9': { func: 'discFunc', top: 'T8', bottom: 'T9' },
  'DiskT9T10': { func: 'discFunc', top: 'T9', bottom: 'T10' },
  'DiskT10T11': { func: 'discFunc', top: 'T10', bottom: 'T11' },
  'DiskT11T12': { func: 'discFunc', top: 'T11', bottom: 'T12' },
  'DiskT12L1': { func: 'discFunc', top: 'T12', bottom: 'L1' },
  'DiskL1L2': { func: 'discFunc', top: 'L1', bottom: 'L2' },
  'DiskL2L3': { func: 'discFunc', top: 'L2', bottom: 'L3' },
  'DiskL3L4': { func: 'discFunc', top: 'L3', bottom: 'L4' },
  'DiskL4L5': { func: 'discFunc', top: 'L4', bottom: 'L5' },
  // 'DiskL5S': { func: 'discFunc', top: 'L5', bottom: 'Sacrum' },
}

// Used for debugging can remove when done
const vertexColorLookup = {
  'disc_top_inner': new THREE.Color(0x0000ff),
  'disc_top_outer': new THREE.Color(0x0000ff),
  'disc_bottom_inner': new THREE.Color(0x0000ff),
  'disc_bottom_outer': new THREE.Color(0x0000ff),
};

// var SubdivisionModifier = require('three-subdivision-modifier');
// SubdivisionModifier(THREE)

const radiansToDegrees = () => {
}

const degreesToRadians = (d) => d * Math.PI / 180;

function loadModuleMetaData(filePath, objectName, obj) {
  const defaultColor = new THREE.Color(0xffffff);

  const data = fs.readFileSync(filePath)
  if (data) {
    const metaData = JSON.parse(data);
    const { geometry } = obj;
    const { faces } = geometry;

    const { vertexGroups } = metaData;
    objectList[objectName] = { ...objectList[objectName], ...metaData };

    // used for debugging can remove later
    vertexGroups.forEach(v => {
      const { vertexIndexArray, name } = v;
      if (vertexIndexArray !== undefined) {
        if (Array.isArray(vertexIndexArray)) {
          vertexIndexArray.forEach(index => {
            faces.forEach((face, i) => {
              const { a, b, c } = face;
              if (a === index) face.vertexColors[0] = vertexColorLookup[name];
              if (b === index) face.vertexColors[1] = vertexColorLookup[name];
              if (c === index) face.vertexColors[2] = vertexColorLookup[name];

              if (!face.vertexColors[0]) face.vertexColors[0] = defaultColor;
              if (!face.vertexColors[1]) face.vertexColors[1] = defaultColor;
              if (!face.vertexColors[2]) face.vertexColors[2] = defaultColor;
            });
          });
        }
      }
    })
  };
}

function loadModuleGeometry(objectName, parentContainer) {
  const loader = new THREE.JSONLoader();

  return new Promise((resolve, reject) => {
    loader.load(`models/${objectName}.json`, (geometry, materials) => {
      const obj = objectName === 'SpinePath' ?
        new THREE.Line(geometry, matLine) :
        new THREE.Mesh(geometry, matMesh);

      loadModuleMetaData(`app/models/${objectName}_meta.json`, objectName, obj);

      geometry.computeVertexNormals();

      parentContainer.add(obj);
      objectList[objectName] = { ...objectList[objectName], obj }

      resolve(obj)
    });
  });
}

async function loadModule(parentContainer) {
  console.log('Loading');
  await Promise.all(Object.keys(objectList).map(objectName => loadModuleGeometry(objectName, parentContainer)))
  console.log('Loaded');

  const { SpinePath } = objectList;
  const { vertexGroups } = SpinePath;

  Object.keys(objectList).forEach((objectName, index) => {
    // place the vertibra along curve
    const objGlobal = vertexGroups.find(v => v.name === objectName)
    if (!objGlobal) return;

    const { vertexIndexArray } = vertexGroups.find(v => v.name === objectName)
    const { 0: vertexIndex } = vertexIndexArray;
    if (vertexIndex !== undefined) {
      const { obj } = SpinePath;
      const { geometry } = obj;
      const { vertices } = geometry;
      const vertex = vertices[vertexIndex];

      const prevVertexIndex = vertexIndex - 1;
      const nextVertexIndex = vertexIndex + 1;

      if (nextVertexIndex > (vertices.length - 1)) {
        console.log('end', vertexIndex)
      } else if (prevVertexIndex < 0) {
        console.log('start', vertexIndex)
      } else {
        const prevVertex = vertices[prevVertexIndex];
        const nextVertex = vertices[nextVertexIndex];

        const vecA = new THREE.Vector3().subVectors(prevVertex, vertex);
        const vecB = new THREE.Vector3().subVectors(nextVertex, vertex);
        const crossVector = new THREE.Vector3().crossVectors(vecA, vecB).normalize();
        const crossVectorA = new THREE.Vector3().crossVectors(crossVector, vecA).normalize();
        const crossVectorB = new THREE.Vector3().crossVectors(crossVector, vecB).normalize();
        const averagevector = new THREE.Vector3().addVectors(crossVectorA, crossVectorB).divideScalar(2);

        objectList[objectName].obj.lookAt(averagevector)
        objectList[objectName].obj.rotateX(degreesToRadians(-90))
        if (averagevector.z < 0) objectList[objectName].obj.rotateY(degreesToRadians(180))
      }

      objectList[objectName].obj.position.set(vertex.x, vertex.y, vertex.z);
    }
  });

  const firstVertexGroup = (obj, vertexGroupList) => {
    let startingIndex = null;
    const { geometry } = obj;
    const { vertices, faces } = geometry;

    for (let i = 0, len = vertexGroupList.length; i < len; i++) {
      if (vertices[vertexGroupList[i]].x === 0) {
        startingIndex = startingIndex === null ? i :
          vertices[vertexGroupList[i]].z < vertices[vertexGroupList[startingIndex]].z ? i : startingIndex;
      }
    }

    return startingIndex;
  }

  const processConnected = (mesh, vertexIndex, vertexList, newList = [], level = 0) => {
    const { geometry } = mesh;
    const { faces } = geometry;

    if ( level > 16) return;
    newList.push(vertexIndex);

    for (let i = 0, len = faces.length; i < len; i++) {
      const face = faces[i];

      if (
        face.a === vertexIndex ||
        face.b === vertexIndex ||
        face.c === vertexIndex
      ) {
        for (const testIndex of vertexList) {
          if (
            face.a === testIndex ||
            face.b === testIndex ||
            face.c === testIndex
          ) {
            if (!newList.find(v => v === testIndex)) {
              processConnected(mesh, testIndex, vertexList, newList, level + 1)
              return newList;
            }
          }
        }
      }
    }

    return newList;
  }

  const mat = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0x0000ff),
    // vertexColors: THREE.VertexColors,
    // wireframe: true,
    // shading: THREE.FlatShading,
  });

  // Reorder vertices for disc objects
  // Also do a translation and parent to main scene
  Object.keys(objectListBuild).forEach((objectName, index) => {
    const objectBuild = objectListBuild[objectName];
    const { top, bottom } = objectBuild;

    const topObject = objectList[top];
    const bottomObject = objectList[bottom];

    const { obj: topObjectMesh } = topObject;
    const { obj: bottomObjectMesh } = bottomObject;

    const vertexGroupTop = topObject.vertexGroups
      .find(v => v.name === 'disc_bottom_outer').vertexIndexArray;
    const startIndexTop =
      vertexGroupTop[firstVertexGroup(topObjectMesh, vertexGroupTop)];

    const vertexGroupBottom = bottomObject.vertexGroups
      .find(v => v.name === 'disc_top_outer').vertexIndexArray;
    const startIndexBottom =
      vertexGroupBottom[firstVertexGroup(bottomObjectMesh, vertexGroupBottom)];

    // Used for debugging
    // console.log(objectName);
    // const { faces: topFaces } = topObjectMesh.geometry;
    // for (let i = 0; i < topFaces.length; i++) {
    //   if(topFaces[i].a === startIndexTop) {
    //     topFaces[i].vertexColors[0] = new THREE.Color(0xffff00);
    //   }
    //
    //   if(topFaces[i].b === startIndexTop) {
    //     topFaces[i].vertexColors[1] = new THREE.Color(0xffff00);
    //   }
    //
    //   if(topFaces[i].c === startIndexTop) {
    //     topFaces[i].vertexColors[2] = new THREE.Color(0xffff00);
    //   }
    // }
    //
    // const { faces: bottomFaces } = bottomObjectMesh.geometry;
    // for (let i = 0; i < bottomFaces.length; i++) {
    //   if(bottomFaces[i].a === startIndexBottom) {
    //     bottomFaces[i].vertexColors[0] = new THREE.Color(0xffff00);
    //   }
    //
    //   if(bottomFaces[i].b === startIndexBottom) {
    //     bottomFaces[i].vertexColors[1] = new THREE.Color(0xffff00);
    //   }
    //
    //   if(bottomFaces[i].c === startIndexBottom) {
    //     bottomFaces[i].vertexColors[2] = new THREE.Color(0xffff00);
    //   }
    // }

    const newListTop =
      processConnected(topObjectMesh, startIndexTop, vertexGroupTop);
    const newListBottom =
      processConnected(bottomObjectMesh, startIndexBottom, vertexGroupBottom);

    const discGeoTop = new THREE.Geometry();
    const discGeoBottom = new THREE.Geometry();

    // console.log(topObjectMesh.position)

    // Generate vertices
    newListTop.forEach(v => {
      discGeoTop.vertices.push(
        new THREE.Vector3().copy(topObjectMesh.geometry.vertices[v])
      );
    })


    newListBottom.forEach(v => {
      discGeoBottom.vertices.push(
        new THREE.Vector3().copy(bottomObjectMesh.geometry.vertices[v])
      );
    })

    // Do transforms
    const discMeshTop = new THREE.Mesh(discGeoTop, mat);
    const discMeshBottom = new THREE.Mesh(discGeoBottom, mat);

    const matTop = new THREE.Matrix4()
      .makeRotationFromEuler(topObjectMesh.rotation)
      .setPosition(topObjectMesh.position);
    discMeshTop.geometry.applyMatrix(matTop);

    const matBottom = new THREE.Matrix4()
      .makeRotationFromEuler(bottomObjectMesh.rotation)
      .setPosition(bottomObjectMesh.position);
    discMeshBottom.geometry.applyMatrix(matBottom);

    // merge the geometry into top object
    discMeshTop.geometry.merge(discMeshBottom.geometry);

    // Build faces
    const verticesOffset = 14
    for (let i = 0; i < (verticesOffset - 1); i++) {
      discMeshTop.geometry.faces.push(
        new THREE.Face3(
          i,
          (i + verticesOffset) + 1,
          (i + verticesOffset),
        )
      );
      discMeshTop.geometry.faces.push(
        new THREE.Face3(
          i,
          (i + 1),
          (i + verticesOffset) + 1,
        )
      );
    }

    // last face on outside
    discMeshTop.geometry.faces.push(
      new THREE.Face3(
        (verticesOffset - 1),
        verticesOffset,
        (verticesOffset + (verticesOffset - 1)),
      )
    );

    discMeshTop.geometry.faces.push(
      new THREE.Face3(
        (verticesOffset - 1),
        0,
        (verticesOffset),
      )
    );

    discMeshTop.geometry.computeVertexNormals();

    // Add to container
    parentContainer.add(discMeshTop);
  })

}
