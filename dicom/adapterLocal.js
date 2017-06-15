//  fs.readFile(fullPath, (err, data) => {
//     if (data) {
//       const tags = dicomReadRaw(data);
//       callback(undefined, {
//         ...tags,
//         directory,
//         file,
//       });
//     }
//   });