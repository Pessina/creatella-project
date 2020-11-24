import React from "react";
import { formatDate, formatPrice } from "../utils/utils";

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
				<div className="centered">
					<button
						onClick={() => {
							alert("It's just a demo");
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
