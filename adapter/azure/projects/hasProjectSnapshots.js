// import { getBlobProperties } from "../blob";

export default async ({
  studyUID = "",
  containerName,
  blobAdapter: { getBlobProperties }
}) => {
  return await getBlobProperties({
    containerName,
    blobName: studyUID
  });

  //   await createContainer();

  //   return await new Promise((resolve, reject) => {
  //     blobService.getBlobProperties(
  //       tableName,
  //       studyUID,
  //       (error, properties, status) => {
  //         if (error) {
  //           const { statusCode } = error;

  //           if (statusCode === 404) {
  //             resolve(false);
  //             return;
  //           }

  //           reject(error);
  //           return;
  //         }

  //         // issue-18
  //         if (status.isSuccessful) {
  //           resolve(true);
  //         }
  //       }
  //     );
  //   });
};
