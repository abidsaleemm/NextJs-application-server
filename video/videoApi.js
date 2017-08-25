import fs from 'fs';
// import path from 'path';
import videoshow from 'videoshow';
import rimraf from 'rimraf';
import os from 'os';

// Add to generateVideo?
const options = {
	fps: 10,
	loop: 1, // seconds
	transition: false,
	transitionDuration: 0.1, // seconds 
	videoBitrate: 1024,
	videoCodec: 'libx264',
	size: '640x?',
	audioBitrate: '128k', // TODO No audio at the moment
	audioChannels: 2,
	format: 'mp4',
	pixelFormat: 'yuv420p'
};

// TODO move this to index.js
export const compose = async ({ session }) => {
	// TODO Check and read all frame files by directory listing if frame missing throw error
	const imagePaths = [];
	const ret = await generateVideo({ session, imagePaths });
	// await cleanup({ session });
};

export const saveImage = async ({ session, index, raw }) => {
	const fullPath = os.tmpdir();

	// TODO handle Image number
	// TODO store as PNG

	console.log('fullPath', fullPath);
};

// This could burn up a bunch of disk space so just destroy after a video is created and pushed to blob
export const cleanupImages = async ({ session }) => 
	new Promise((resolve, reject) => 
		rimraf(`${os.tmpdir(session)}/`, err =>
			err ? reject(err) : resolve(folderName)));

// export const cleanupVideo = async () => 
	// new Promise((resolve, reject) => 
		// fs.unlink(path.resolve(buildStorage, videoName), (err, stat) =>

export const generateVideo = async ({ session, imagePaths }) => {
	// TODO check to make sure all frames exist
	const videoPath = `${os.tmpdir()}/${session}.mp4`;
	console.log('videoPath', videoPath);
	
	return new Promise((resolve, reject) => {
		videoshow(imagePaths, options)
			.save(videoPath)
			.on('start', command => {
				console.log('ffmpeg process started');
			})
			.on('error', (err, stdout, stderr) => {
				console.error('err', err);
				console.error('ffmpeg stderr', stderr);
				reject({ err, stderr });
			}).on('end', output => {
				console.error('video created in: ' + output);
				resolve(output);
			});
	});
};

// TODO Check and read all frame files by directory listing if frame missing throw error

// export const mapBinaryToFile = binaryImages =>
// 	new Promise((resolve, reject) => {
// 		// name of the file as well as the name of the generated video
// 		let tempDirectory = createUniqueFilename();

// 		createUniqueFilename = () => getFreshTimestamp() * Math.ceil(Math.random() * 1000) + "";

// 		// fs.mkdir(path.resolve(tempStorage, tempDirectory));

// 		const filePaths = binaryImages.map(imageBinary => {
// 			let timestamp = createUniqueFilename();

// 			const filePath = path.resolve(tempStorage, tempDirectory, timestamp);

// 			fs.writeFileSync(path.resolve(filePath), imageBinary, 'binary', err => {
// 				throw new Error(err)
// 			});

// 			return path.resolve(tempDirectory, filePath)
// 		});

// 		// done caching images
// 		// trigger video creation
// 		generateVideoFromImages(tempDirectory, filePaths)
// 			.then(success =>
// 				pushVideoToBlob(path.resolve(buildStorage, tempDirectory+'.mp4'), tempDirectory)
// 				.then(success => removeSessionFolder(tempDirectory)
// 					.then(success => clearTempVideo(tempDirectory+'.mp4')
// 						.then(success => resolve(success))
// 						.catch(err => reject(err)))
// 					.catch(err => reject(err)))
// 				.catch(err => reject(err)))
// 			.catch(err => reject(err));
// 	});
// }

// export const generateVideoFromImages = ({ 
// 	sessionStore, 
// 	imagePaths, 
// 	options = defaultVideoOptions
// }) => new Promise((resolve, reject) => {
// 		videoshow(imagePaths, options)
// 			.save(path.resolve(buildStorage, sessionStore + '.mp4'))
// 			.on('start', command => {
// 				console.log('ffmpeg process started');
// 			})
// 			.on('error', (err, stdout, stderr) => {
// 				console.error(err);
// 				console.error('ffmpeg stderr: ' + stderr);

// 				reject(err);
// 			}).on('end', output => {
// 				console.error('video created in: ' + output);
// 				resolve(output);
// 			});
// 	});

// create a temporary directory
// export const createTemporaryFolder = folderName => {
// 	let uniqueFilename = createUniqueFilename();
	
// 	fs.mkdirSync(path.resolve(tempStorage, folderName ? folderName : uniqueFilename));

// 	return (folderName ? folderName : uniqueFilename);
// }

// export const removeSessionFolder = folderName => {
// 	return new Promise((resolve, reject) => {
// 		rimraf(path.resolve(tempStorage, folderName), err => {
// 			resolve(folderName);
// 		});
// 	});
// }

// export const clearTempVideo = videoName => {
// 	return new Promise((resolve, reject) => {
// 		fs.unlink(path.resolve(buildStorage, videoName), (err, stat) => {
// 			if (err) reject(err);
// 			else resolve('success');
// 		});
// 	});
// }

// get new timestamp
// export const getFreshTimestamp = () => new Date().getTime()

// get a unique filename using Math.random()
// export const createUniqueFilename = () => getFreshTimestamp() * Math.ceil(Math.random() * 1000) + "";

/**
 * TODO
 * push the generated video files to Azure blob
 * @param {*} videoPath represents the path where the video is generated
 * @param {*} blobName the name that you want to give to your blob in blob container
 * @returns Promise
 */
// export const pushVideoToBlob = (videoPath, blobName) => {
// 	console.log('pushing to blob from file '+ videoPath)
// 	return new Promise((resolve, reject) => {
// 		AzureBlob.pushBlobFromFile(videoPath, blobName)
// 			.then(success => resolve(success))
// 			.catch(error => resolve(error));
// 	});
// }