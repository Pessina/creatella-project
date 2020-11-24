import React from "react";

// TODO: Improve resonsiveness by allowing to set breakpoints
const GridComponent = ({ children }) => {
	let c = children;

	// Remove null elements
	if (children instanceof Array) c = children.filter((el) => el);

	return <div className="grid">{c}</div>;
};

export default GridComponent;
