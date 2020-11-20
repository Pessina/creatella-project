import React from "react";

const Loading = ({ loading }) => {
	return (
		<div className="full-screen loading-component centered flx-col">
			<span className="loader" />
			<p>Loading ...</p>
		</div>
	);
};

export default Loading;
