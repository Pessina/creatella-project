import React, { useEffect } from "react";

const Loading = ({ loading }) => {
	useEffect(() => {
		window.document.getElementsByTagName("html")[0].style.overflowY = loading
			? "hidden"
			: "initial";
	}, [loading]);

	return (
		<div
			className="full-screen loading-component centered flx-col"
			style={{ display: `${loading ? "flex" : "none"}` }}
		>
			<span className="loader" />
			<p>Loading ...</p>
		</div>
	);
};

export default Loading;
