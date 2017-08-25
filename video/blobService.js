import Azure from 'azure-storage';
import path from 'path';

let self = {};

const defaultContainerConfig = {
	publicAccessLevel: 'blob'
};

/**
 * creates a new instance of AzureBlob storage
 * @param {*} config 
 */

let AzureBlob = ( config ) => {
	self.config = config;
	try {
		self._azureBlobService = Azure.createBlobService(config.account, config.accessKey);
	} catch (err) {
		throw new Error ('Error in configurations: '+ err);
	}
}

/**
 * The function to push video to blob
 * @param { string } filePath -> path of the video file
 * @param { string } blobName -> optional name to give to a new blob. If no name, the filename will be used
 * @param { string } container -> name of the container to push to
 */
AzureBlob.prototype.pushBlobFromFile = ( filePath, blobName, container = self.config.container ) => {
	return new Promise((resolve, reject) => {
		// define the blob name
		self._azureBlobService.createContainerIfNotExists(container, defaultContainerConfig, (err, result, response) => {
			if (err) {
				return reject (err);
			}
			const targetBlobName = blobName ? blobName : filePath.split(path.sep)[filePath.split(path.sep).length - 1];
			self._azureBlobService.createBlockBlobFromLocalFile(container, targetBlobName, filePath, (err, result, response) => {
				if (err) {
					return reject(err);
				} else {
					return resolve('success')
				}
			});
		})
	});
}

module.exports = (config) => new AzureBlob (config);
// export default (config) => new AzureBlob (config);