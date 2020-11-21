import React from "react";
import { Ads, fetchProducts } from "../../utils/data";
import GridComponent from "../../components/GridComponent";
import ContainerComponent from "../../components/ContainerComponent";
import Loading from "../../components/Loading";
import { renderAd } from "../../utils/utils";
import AdCard from "../../components/AdCard";
import ProductCard from "../../components/ProductCard";

const productsInitialState = {
	page: 1,
	products: [],
	loading: false,
	adGenerator: new Ads(),
};

export default class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = productsInitialState;
		this.fetchLocker = false;

		this.getProducts = this.getProducts.bind(this);
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
				products,
				page: 2,
			}));
		else
			this.setState((prevState) => ({
				products: [...prevState.products, ...products],
				page: prevState.page + 1,
			}));
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
		window.addEventListener("scroll", this.reachBottom, false);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.reachBottom, false);
	}

	render() {
		const { products, loading, page, adGenerator } = this.state;

		return (
			<ContainerComponent>
				<Loading loading={loading} />
				<GridComponent nColumns={3}>
					{products.map((el, i) =>
						renderAd(i) ? (
							<AdCard ad={adGenerator.fetchAd()} key={i.toString()} />
						) : (
							<ProductCard {...el} key={el.id} />
						)
					)}
				</GridComponent>
			</ContainerComponent>
		);
	}
}
