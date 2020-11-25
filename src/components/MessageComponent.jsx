import React from "react";

const MessageComponent = ({ show, message }) => {
	if (!show) return null;

	return (
		<div className="centered">
			<p className="font-big">
				<strong>~ {message} ~</strong>
			</p>
		</div>
	);
};

export default MessageComponent;
