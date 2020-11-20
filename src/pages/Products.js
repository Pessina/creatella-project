import React, { useEffect, useState } from "react";
import { Ads, fetchProducts } from "../utils/data";

const Products = ({}) => {
	const [products, setProducts] = useState([]);
	const [ad, setAd] = useState(null);
	const [adGenerator, setAdGenerator] = useState(new Ads());

	const getProducts = async ({ page, sort }) => {
		setProducts(await fetchProducts({ page, sort }));
	};

	const getAd = () => {
		setAd(adGenerator.fetchAd());
	};

	useEffect(() => {
		getProducts({ page: 1 });
		getAd();
	}, []);

	return (
		<>
			<img src={ad} />
			{products.map((el) => (
				<div>
					<p>ID: {el.id}</p>
					<p>Size: {el.size}</p>
					<p>Price: ${el.price}</p>
					<p>Face: {el.face}</p>
					<p>Date: {el.date}</p>
					<p>-------------------------</p>
				</div>
			))}
		</>
	);
};

export default Products;
