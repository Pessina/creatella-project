import React from "react";

// Using 'flex-wrap' to allow the grid adapt card width to face width
const GridComponent = ({ children }) => {
	let c = children;

	// Remove null elements
	if (children instanceof Array) c = children.filter((el) => el);

	return <div className="grid">{c}</div>;
};

export default GridComponent;
