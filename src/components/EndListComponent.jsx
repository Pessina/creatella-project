import React from "react";

const EndListComponent = ({ show }) => {
	if (!show) return null;

	return (
		<div className="centered">
			<p className="font-big">
				<strong>~ end of catalogue ~</strong>
			</p>
		</div>
	);
};

export default EndListComponent;
