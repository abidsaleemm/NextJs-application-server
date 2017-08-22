import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PDFJS from 'pdfjs-dist';
import axios from 'axios';
import Loader from '../components/loader';
// for performing cached download rather than lookup downloads
import DownloadLink from 'react-download-link';

var overlay;
var id;
var pdfData;
var canvasContext;

export const openModal = ( studyUID ) => {
	overlay = document.getElementById('overlay');
	id = studyUID;
	overlay.classList.remove("is-hidden");
	document.getElementById('loader').style.display = 'block';
	axios.get(`http://localhost:3000/pdf/?id=${studyUID}`,{ responseType: 'arraybuffer' })
			.then(function (response) {		
				document.getElementById('loader').style.display = 'none';
				console.log (response);
				const data = new Uint8Array( response.data )

				pdfData = data;

				const loadingTask = PDFJS.getDocument({data: data});
				
				loadingTask.promise.then(function(pdf) {
					console.log('PDF loaded');
					
					pdf.getPage(1).then(function(page) {
						console.log('Page loaded');
						
						const scale = 1.2;
						const viewport = page.getViewport(scale);
						
						const canvas = document.createElement ('canvas');
						// const canvas = document.getElementById('the-canvas');
						const context = canvas.getContext('2d');
						canvasContext = context;
						canvas.height = viewport.height;
						canvas.width = viewport.width;

						canvas.setAttribute ('id', 'canvas');
						document.getElementById ('canvas-container').appendChild (canvas);
					
						const renderContext = {
							canvasContext: context,
							viewport: viewport
						};
						const renderTask = page.render(renderContext);
						renderTask.then(function () {
							console.log('Page rendered');
							// modalElement.style.display = (modalElement.style.display == "block") ? "hidden" : "block";
						});
					});
				}, function (reason) {
					// PDF loading error
					console.error(reason);
				});
	
			})
			.catch(function (error) {
				console.log(error);
			});
}

export const closeModal = () => {
	overlay.classList.add("is-hidden");
	document.getElementById ('canvas-container').removeChild (document.getElementById ('canvas'));
};

// export const download = () => window.location = `/pdf/?id=${id}`

/**
 * @prop {any} data -> any data (specially keys)
 * @prop {actionCallback} -> callback for action to perform when clicked primary button
 */
export default ( { studyUID = undefined, fetching = false } ) => (
	<section className='overlay is-hidden' id='overlay'>
	<style jsx>{`
		.is-hidden { display: none; }
		
		.button-close {
			display: inline-block;
			width: 16px;
			height: 16px;
			position: absolute;
			top: 10px;
			right: 10px;
			cursor: pointer;
			background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAowAAAKMB8MeazgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAB5SURBVDiNrZPRCcAwCEQfnUiySAZuF8kSWeH6Yz8KrQZMQAicJ+epAB0YwAmYJKIADLic0/GPPCbQAnLznCd/4NWUFfkgy1VjH8CryA95ApYltAiTRCZxpuoW+gz9WXE6NPeg+ra1UDIxGlWEObe4SGxY5fIxlc75Bkt9V4JS7KWJAAAAAElFTkSuQmCC59ef34356faa7edebc7ed5432ddb673d');
		}
		
		.overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			background: rgba(0,0,0,0.6);
		}
		
		.modal-content {
			padding: 20px 30px;
			width:800px;
			position: relative;
			min-height: 300px;
			margin: 5% auto 0;
			background: #fff;
		}
		.text-center {
			text-align: center;
		}
	`}</style>

	<section className="modal-content">
		<span className="button-close" onClick={() => closeModal()}></span>
		<p>Preview Invoice &nbsp; <DownloadLink className="btn btn-default" filename={"Invoice.pdf"} label={"Download as pdf"} exportFile = {() => pdfData }/></p>
		<section>
			<p id='loader' className='text-center'>Generating preview..</p>
			<section id='canvas-container'>
				
			</section>
		</section>
	</section>
	
	</section>
);