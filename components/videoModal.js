import React from 'react'
import ReactPlayer from 'react-player'

export default ({
	url = null,
	show = false,
	onClose = () => { }
}) => (
		<div className={show ? 'overlay' : 'isHidden'}>
			<style jsx>
			{`
			@import "~video-react/styles/scss/video-react";

			.isHidden { display: none; }
			
			.buttonClose {
				width: 16px;
				height: 16px;
				cursor: pointer;
				background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAowAAAKMB8MeazgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAB5SURBVDiNrZPRCcAwCEQfnUiySAZuF8kSWeH6Yz8KrQZMQAicJ+epAB0YwAmYJKIADLic0/GPPCbQAnLznCd/4NWUFfkgy1VjH8CryA95ApYltAiTRCZxpuoW+gz9WXE6NPeg+ra1UDIxGlWEObe4SGxY5fIxlc75Bkt9V4JS7KWJAAAAAElFTkSuQmCC59ef34356faa7edebc7ed5432ddb673d');
			}
			
			.overlay {
				display: flex;
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				overflow-y: scroll; 
				background: rgba(0, 0, 0, 0.6);
				justify-content: space-around;
				align-items: center;
			}
			
			.body {
				display: flex;
				flex-direction: column;
				min-width: 350px;
				min-height: 150px;
				width: 90%;
				background: #fff;
				padding: 15px; 
			}

			.header {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

			.content {
				padding: 10px; 
			}
			`}
			</style>
			<div className="body">
				<div className="header">
					<div>
						<p>Preview Video <a href={url}>Download</a></p>
					</div>
					<div className="buttonClose" onClick={() => onClose()}></div>
				</div>
				<div className="content">
				<ReactPlayer 
				url={url}
				width="100%"
				height="100%"
				playing 
				controls
			/>				
				</div>
			</div>
		</div>
	);
