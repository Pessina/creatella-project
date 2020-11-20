import React from "react";
import { Ads, fetchProducts } from "../utils/data";
import GridComponent from "../components/GridComponent";
import ProductCard from "../components/ProductCard.jsx";
import ContainerComponent from "../components/ContainerComponent";
import AdCard from "../components/AdCard";
import Loading from "../components/Loading";

const productsInitialState = {
	page: 1,
	products: [],
	ad: null,
	adGenerator: new Ads(),
	loading: false,
};

export default class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = productsInitialState;
		this.fetchLocker = false;

		this.getProducts = this.getProducts.bind(this);
		this.getAd = this.getAd.bind(this);
		this.reachBottom = this.reachBottom.bind(this);
	}

	async getProducts(reset = false) {
		const { page, sort } = this.state;
		const products = await fetchProducts({
			page: reset ? 1 : page,
			sort,
		});

		if (reset)
			this.setState(() => ({
				products: products,
				page: 2,
			}));
		else
			this.setState((prevState) => ({
				products: prevState.products.concat(products),
				page: prevState.page + 1,
			}));
	}

	getAd() {
		const { adGenerator } = this.state;
		this.setState(() => ({ ad: adGenerator.fetchAd() }));
	}

	async reachBottom() {
		var isBottom =
			window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

		if (!this.fetchLocker && isBottom) {
			this.fetchLocker = true;
			this.setState({ loading: true });
			await this.getProducts();
			this.setState({ loading: false });
			this.fetchLocker = false;
		}
	}

	componentDidMount() {
		this.getProducts();
		this.getAd();

		window.addEventListener("scroll", this.reachBottom, false);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.reachBottom, false);
	}

	render() {
		const { products, loading, ad } = this.state;

		return (
			<ContainerComponent>
				<Loading loading={loading} />
				<GridComponent nColumns={3}>
					<AdCard ad={ad} />
					{/* It should have a key prop, but I can`t use the ID as keys, because have some that are the same */}
					{products.map((el) => (
						<ProductCard {...el} />
					))}
				</GridComponent>
			</ContainerComponent>
		);
	}
}
