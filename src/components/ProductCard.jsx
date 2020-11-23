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
			<div className="card-footer centered">
				<div className="flx centered">
					<button
						onClick={() => {
							console.log("It's just a demo");
						}}
					>
						Buy
					</button>
					<p>{formatPrice(price)}</p>
				</div>
				<p>{formatDate(date)}</p>
			</div>
		</div>
	);
};

export default ProductCard;
