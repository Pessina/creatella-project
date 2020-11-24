import React from "react";

const AdCard = ({ ad }) => {
	return (
		<div className="ad">
			{/*TODO:  Image bad resizing on change device width */}
			<img className="border fluid" src={ad} alt="advertisement" />
		</div>
	);
};

export default AdCard;
