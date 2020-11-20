import React from "react";
import GridComponent from "./GridComponent";

const ProductCard = ({ id, size, price, face, date }) => {
	return (
		<div className=" border">
			<div className="card-product">
				<p name="face" style={{ fontSize: `${size}px` }}>
					{face}
				</p>
				<p name="id" className="light-color">
					{id}
				</p>
			</div>
			<div className="card-footer">
				<p>${price}</p>
				<p>{date.split(" ").slice(1, 4).join("/")}</p>
			</div>
		</div>
	);
};

export default ProductCard;
