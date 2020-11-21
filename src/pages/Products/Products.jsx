import React from "react";
import { fetchProducts } from "../../utils/data";
import GridComponent from "../../components/GridComponent";
import ContainerComponent from "../../components/ContainerComponent";
import Loading from "../../components/Loading";
import ListContent from "./ListContent";

const productsInitialState = {
	page: 1, // Store the index of next page to be fetched
	products: [], // Data to be rendered
	preFetchedProducts: [], // Store pre-emptivly fetched data
	loading: false,
	fetchLocker: false, // Track if data is been fetched and avoid multiple simultaneously fetches
};

export default class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = productsInitialState;

		this.getProducts = this.getProducts.bind(this);
		this.reachBottom = this.reachBottom.bind(this);
	}

	// reset - true: fetch page 1 || false: append products and add 1 to page
	async getProducts(reset = false) {
		const { page, sort } = this.state;

		const products = await fetchProducts({
			page: reset ? 1 : page,
			sort,
		});

		if (reset) this.setState(() => ({ products, page: 2 }));
		else
			this.setState((prevState) => ({
				preFetchedProducts: products,
				page: prevState.page + 1,
			}));
	}

	async reachBottom() {
		const { preFetchedProducts } = this.state;

		var isBottom =
			window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

		if (isBottom) {
			// If there is no pre-fetched data, show "Loading"
			if (preFetchedProducts.length === 0) {
				this.setState({ loading: true });
			} else {
				// If there is data, just show it
				this.setState((prevState) => ({
					products: prevState.preFetchedProducts,
					preFetchedProducts: [],
				}));
			}
		}
	}

	componentDidMount() {
		this.setState(() => ({ fetchLocker: true }));
		this.getProducts(true)
			.then(() => this.getProducts()) // Pre-emptively fetch next page
			.then(() => this.setState(() => ({ fetchLocker: false })));

		window.addEventListener("scroll", this.reachBottom, false);
	}

	componentDidUpdate() {
		const { loading, preFetchedProducts, fetchLocker } = this.state;

		// If the pre-emptivly fetched data array is empty, fetch next page
		if (!fetchLocker && preFetchedProducts.length === 0) {
			this.setState(() => ({ fetchLocker: true }));
			this.getProducts().then(() =>
				this.setState(() => ({ fetchLocker: false }))
			);
		}

		// If the app is loading, the new data is directly rendered
		if (loading && preFetchedProducts.length !== 0) {
			this.setState((prevState) => ({
				products: prevState.preFetchedProducts,
				preFetchedProducts: [],
				loading: false,
			}));
		}
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.reachBottom, false);
	}

	render() {
		const { products, loading, page } = this.state;
		return (
			<ContainerComponent>
				<Loading loading={loading} />
				<GridComponent nColumns={3}>
					<ListContent list={products} reset={page === 1} />
				</GridComponent>
			</ContainerComponent>
		);
	}
}
