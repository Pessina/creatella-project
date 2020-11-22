import React, { useEffect, useState } from "react";

// I understood that should be a animated "loading..." message in plain text.
// Not a animated spinner
const Loading = ({ loading }) => {
	const [i, setI] = useState(7);

	useEffect(() => {
		const intervalId = setInterval(function () {
			setI(i > 10 ? 7 : i + 1);
		}, 300);

		return () => clearInterval(intervalId);
	});

	return (
		<div
			style={{ display: `${loading ? "flex" : "none"}` }}
			className="centered"
		>
			<p className="font-big">
				<strong>{"loading ...".slice(0, i)}</strong>
			</p>
		</div>
	);
};

export default Loading;
