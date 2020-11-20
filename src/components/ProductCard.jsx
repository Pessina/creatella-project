import React from "react";
import GridComponent from "./GridComponent";

const ProductCard = ({ id, size, price, face, date }) => {
	return (
		<div className=" border product-card">
			<div className="centered card-product">
				<p style={{ fontSize: `${size}px` }}>{face}</p>
			</div>
			<div className="card-footer">
				<p>Size: {size}px</p>
				<p>Price: ${price}</p>
				<p>ID: {id}</p>
				<p>Date: {date.split(" ").slice(1, 4).join("/")}</p>
			</div>
		</div>
	);
};

export default ProductCard;
