import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

var id;
/**
 * open up the modal
 */
export const showModal = (studyUID) => {
	id = studyUID;
	var modalElement =	document.getElementById("previewModal")
	modalElement.style.display = (modalElement.style.display == "block") ? "hidden" : "block";

	// TODO replace axios with React fetch
	fetch('http://localhost:3000/pdf/?id='+ studyUID,{ responseType: 'arraybuffer' })
		.then(function (response) {		
			console.log (response);
			const data = new Uint8Array( response.body )
			const loadingTask = PDFJS.getDocument({data: data});
			
			loadingTask.promise.then(function(pdf) {
				console.log('PDF loaded');
				
				pdf.getPage(1).then(function(page) {
					console.log('Page loaded');
					
					const scale = 1.2;
					const viewport = page.getViewport(scale);
					
					const canvas = document.getElementById('the-canvas');
					const context = canvas.getContext('2d');
					canvas.height = viewport.height;
					canvas.width = viewport.width;
				
					const renderContext = {
						canvasContext: context,
						viewport: viewport
					};
					const renderTask = page.render(renderContext);
					renderTask.then(function () {
						console.log('Page rendered');
						downloadAction = () => {
							alert (studyUID);
						}
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

/**
 * closes up the modal
 */
export const closeModal = () => document.getElementById("previewModal").style.display = "none"

// trigger to download PDF
const download = () => window.location = `/pdf/?id=${id}`

/**
 * @prop {any} data -> any data (specially keys)
 * @prop {actionCallback} -> callback for action to perform when clicked primary button
 */
export default ( { studyUID = undefined } ) => (
	<div id="previewModal" className="modal fade show" tabIndex={-1} role={'dialog'}>
		<div className="modal-dialog modal-lg">
			<div className="modal-content">
				<div className="modal-header">
					<button type="button" className="close" onClick={() => closeModal()}
						data-dismiss="modal" aria-hidden="true">×</button>
					<h4 className="modal-title">Browser Update</h4>
				</div>
				<div className="modal-body">
					<canvas id="the-canvas"></canvas>
					<p className="text-warning"><small>Would you like to Download it Now</small></p>
				</div>
				<div className="modal-footer">
					<Button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => download()}>Download</Button>
				</div>
			</div>
		</div>
	</div>
);