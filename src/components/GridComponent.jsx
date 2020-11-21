import React from "react";

const GridComponent = ({ children, nColumns = 1 }) => {
	let c = children;

	// Remove null elements
	if (children instanceof Array) c = children.filter((el) => el);

	return (
		<div
			className="grid"
			style={{
				gridTemplateColumns: `repeat(${nColumns}, minmax(0, 1fr))`,
			}}
		>
			{c}
		</div>
	);
};

export default GridComponent;
