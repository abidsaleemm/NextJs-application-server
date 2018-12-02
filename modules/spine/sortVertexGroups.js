import { uniq } from "ramda";

const discFirstVertex = ({ vertices, vertexGroup = [] }) => {
  let start;

  vertexGroup.forEach(v => {
    if (vertices[v][0] === 0) {
      if (start === undefined) start = v;
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
  level = 0
}) => {
  let newList = [index]; // first
  const removeIndex = vertexGroup.findIndex(v => v === index);

  const vertexList = [
    ...vertexGroup.slice(0, removeIndex),
    ...vertexGroup.slice(removeIndex + 1)
  ];

  const ret = uniq(
    faces
      .filter(([f1, f2, f3]) => f1 === index || f2 === index || f3 === index)
      .map(([f1, f2, f3]) =>
        vertexList.find(v => f1 === v || f2 === v || f3 === v)
      )
      .filter(v => v !== undefined)
  );

  const [foundVertex1, foundVertex2] = ret;

  // TODO make sure correct direction. WG
  if (foundVertex1 !== undefined) {
    newList = [
      ...newList,
      ...discSortConnected({
        faces,
        vertices,
        index:
          level === 0
            ? vertices[foundVertex1][0] < vertices[foundVertex2][0]
              ? foundVertex2
              : foundVertex1
            : foundVertex1,
        vertexGroup: vertexList,
        level: level + 1
      })
    ];
  }

  return newList;
};

export default ({ vertices, faces, vertexGroups }) =>
  Object.entries(vertexGroups)
    .filter(([, vertexGroup]) => vertexGroup !== undefined)
    .map(([key, vertexGroup]) => [
      key,
      discSortConnected({
        faces,
        vertices,
        index: discFirstVertex({
          vertices,
          vertexGroup
        }),
        vertexGroup
      })
    ])
    .reduce((o, [key, value]) => ({ ...o, [key]: value }), {});
