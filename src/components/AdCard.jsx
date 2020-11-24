import React from "react";

const AdCard = ({ ad }) => {
	return (
		<div className="centered">
			<img className="ad border fluid" src={ad} alt="advertisement" />
		</div>
	);
};

export default AdCard;
