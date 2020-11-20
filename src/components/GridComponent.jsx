import React from "react";

const GridComponent = ({ children, nColumns, centered }) => {
	let c = [];
	if (children instanceof Array) c = children.filter((el) => el);

	return (
		<div
			className={`grid-component ${centered ? "centered" : ""}`}
			style={{
				gridTemplateColumns: `repeat(${nColumns}, minmax(0, 1fr))`,
			}}
		>
			{c}
		</div>
	);
};

export default GridComponent;
