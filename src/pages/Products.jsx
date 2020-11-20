import React, { useEffect, useState } from "react";
import { Ads, fetchProducts } from "../utils/data";
import GridComponent from "../components/GridComponent";
import ProductCard from "../components/ProductCard.jsx";

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
			<GridComponent nColumns={3}>
				{products.map((el) => (
					<ProductCard key={el.id} {...el} />
				))}
			</GridComponent>
		</>
	);
};

export default Products;
