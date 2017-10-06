import React from 'react';

export default ({ fetching = false }) =>
	<section
		className='loader'
		style={{ display: fetching ? 'flex' : 'none' }}
	>
		<style jsx>
			{`
		.loader {
            position: fixed;
        	top: 0;
            left: 0;
            width: 100%;
        	height: 100%;
            background: #383838;
            opacity: 0.5;
			z-index: 999999;
			align-items: center;
			justify-content: center;
		}
		`}
		</style>
		<svg
			width="200px"
			height="200px"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
			className="lds-ripple"
			style={{ "background": "none" }}
		>
			<circle
				cx="50"
				cy="50"
				r="14.6121"
				fill="none"
				stroke="#72c9e6"
				strokeWidth="2"
			>
				<animate
					attributeName="r"
					calcMode="spline"
					values="0;40"
					keyTimes="0;1"
					dur="1.6"
					keySplines="0 0.2 0.8 1"
					begin="-0.8s"
					repeatCount="indefinite"
				></animate>
				<animate
					attributeName="opacity"
					calcMode="spline"
					values="1;0"
					keyTimes="0;1"
					dur="1.6"
					keySplines="0.2 0 0.8 1"
					begin="-0.8s"
					repeatCount="indefinite"></animate>
			</circle>
			<circle
				cx="50"
				cy="50"
				r="33.9414"
				fill="none"
				stroke="#f4f5f0"
				strokeWidth="2"
			>
				<animate
					attributeName="r"
					calcMode="spline"
					values="0;40"
					keyTimes="0;1"
					dur="1.6"
					keySplines="0 0.2 0.8 1"
					begin="0s"
					repeatCount="indefinite"></animate>
				<animate
					attributeName="opacity"
					calcMode="spline"
					values="1;0"
					keyTimes="0;1"
					dur="1.6"
					keySplines="0.2 0 0.8 1"
					begin="0s"
					repeatCount="indefinite"></animate>
			</circle>
		</svg>
	</section>