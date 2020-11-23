import React from "react";
import { formatDate, formatPrice } from "../utils/utils";

// TODO: the biggest emojis on big fonts bug the layout (change cards height)
const ProductCard = ({ id, size, price, face, date }) => {
	return (
		<div className=" border flx-column">
			<div className="card-product">
				<div className="card-footer light-color">
					<p className="desktop">Size:{size}</p>
					<p>{id}</p>
				</div>
				<p name="face" style={{ fontSize: `${size}px` }}>
					{face}
				</p>
			</div>
			<div className="card-footer">
				<div>
					<p>{formatPrice(price)}</p>
				</div>
				<div>
					<p>{formatDate(date)}</p>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
