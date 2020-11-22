import React from "react";

const AdCard = ({ ad }) => {
	return (
		<div>
			<img className="border fluid" src={ad} alt="advertisement" />
		</div>
	);
};

export default AdCard;
