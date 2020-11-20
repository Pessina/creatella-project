import React, { useEffect, useState } from "react";
import { Ads, fetchProducts } from "../utils/data";
import GridComponent from "../components/GridComponent";
import ProductCard from "../components/ProductCard.jsx";
import ContainerComponent from "../components/ContainerComponent";
import AdCard from "../components/AdCard";
import Loading from "../components/Loading";

const Products = ({}) => {
	const [products, setProducts] = useState([]);
	const [ad, setAd] = useState(null);
	const [adGenerator, setAdGenerator] = useState(new Ads());
	const [loading, setLoading] = useState(false);

	const getProducts = async ({ page, sort }) => {
		setProducts(await fetchProducts({ page, sort }));
	};

	const getAd = () => {
		setAd(adGenerator.fetchAd());
	};

	useEffect(() => {
		getProducts({});
		getAd();
	}, []);

	return (
		<ContainerComponent>
			<Loading loading={loading} />
			<GridComponent nColumns={3}>
				<AdCard ad={ad} />
				{products.map((el) => (
					<ProductCard key={el.id} {...el} />
				))}
			</GridComponent>
		</ContainerComponent>
	);
};

export default Products;
