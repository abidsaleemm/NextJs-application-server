const discFirstVertex = ({ vertices, vertexGroup = [], }) => {
  let start = -1;
  vertexGroup.forEach(v => {
    if (vertices[v][0] === 0) {
      if (start === -1) start = v;
      start = vertices[v][2] < vertices[start][2] ? v : start;
    }
  });

  return start;
};

const discSortConnected = ({
  faces,
  vertices,
  index,
  vertexGroup,
}) => {
  let newList = [index];
  const removeIndex =
    vertexGroup.findIndex(v => v === index);

  const vertexList = [
    ...vertexGroup.slice(0, removeIndex),
    ...vertexGroup.slice(removeIndex + 1),
  ];

  const [foundVertex] = faces
    .filter(([f1, f2, f3]) =>
      f1 === index ||
      f2 === index ||
      f3 === index
    )
    .map(([f1, f2, f3]) =>
      vertexList.find(v =>
        f1 === v ||
        f2 === v ||
        f3 === v
      )
    )
    .filter(v => v !== undefined)
    .sort((a, b) => vertices[a][0] < vertices[b][0]);

  if (foundVertex !== undefined) {
    newList = [...newList, ...discSortConnected({
      faces,
      vertices,
      index: foundVertex,
      vertexGroup: vertexList,
    })];
  }

  return newList;
};

export default ({ vertices, faces, vertexGroups }) =>
  Object.entries(vertexGroups)
    .filter(([, vertexGroup]) => vertexGroup !== undefined)
    .map(([key, vertexGroup]) =>
      [key, discSortConnected({
        faces,
        vertices,
        index: discFirstVertex({
          vertices,
          vertexGroup,
        }),
        vertexGroup,
      })]
    )
    .reduce((o, [key, value]) =>
      ({ ...o, [key]: value }), {});
