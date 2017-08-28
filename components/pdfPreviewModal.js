import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PDFJS from 'pdfjs-dist';
import axios from 'axios';
import Loader from '../components/loader';
import { connect } from 'react-redux';
// for performing cached download rather than lookup downloads
import DownloadLink from 'react-download-link';
import { invoiceModalAction } from '../actions'

class PdfPreviewModal extends React.Component {

	/**
	 * dispatch event to close the modal
	 */
	closeModal () {
		this.props.dispatch (invoiceModalAction (false));
	}

	/**
	 * render the pdf view
	 */
	componentDidUpdate () {
		// console.log ('component did update');
		const data = new Uint8Array (this.props.pdfData);
		const loadingTask = PDFJS.getDocument ({ data: data });

		loadingTask.promise.then (pdf => {
			pdf.getPage (1).then (page => {
				document.getElementById('loader').style.display = 'none';
				const scale = 1.2;
				const viewport = page.getViewport (scale);

				const canvas = document.getElementById ('canvas');
				const context = canvas.getContext ('2d');

				canvas.height = viewport.height;
				canvas.width = viewport.width;

				// canvas.setAttribute ('id', 'canvas');
				// document.getElementById ('canvas-container').appendChild (canvas);
				// document.getElementById ('canvas-container').firstChild = canvas;

				const renderContext = {
					canvasContext: context,
					viewport: viewport
				};

				const renderTask = page.render (renderContext);
				renderTask.then (() => console.log ('page rendered'))
					.catch (err => {
						document.getElementById('loader').innerHTML = "Error loading pdf";
					});
			})
		})
	}

	render () {
		const { showModal, pdfData } = this.props;

		return (<section className={'overlay '+ (showModal ? '' : 'is-hidden' )} id='overlay'>
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
			<span className="button-close" onClick={this.closeModal.bind(this)}></span>
			<p>Preview Invoice &nbsp; <DownloadLink className="btn btn-default" filename={"Invoice.pdf"} label={"Download as pdf"} exportFile = {() => pdfData }/></p>
			<section>
				<p id='loader' className='text-center'>Generating preview..</p>
				<section id='canvas-container'>
					<canvas id='canvas'></canvas>
				</section>
			</section>
		</section>
		
		</section>);
	}
}

const mapStateToProps = ({ portal, pdfData, showModal }) => ({ ...portal, ...pdfData, ...showModal });
const mapDispatchToProps = (dispatch) => ({dispatch: dispatch});

export default connect (mapStateToProps, mapDispatchToProps)(PdfPreviewModal);