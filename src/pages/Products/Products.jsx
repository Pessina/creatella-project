import React from "react";
import { fetchProducts } from "../../utils/data";
import GridComponent from "../../components/GridComponent";
import ContainerComponent from "../../components/ContainerComponent";
import Loading from "../../components/Loading";
import EndListComponent from "../../components/EndListComponent";
import ListContent from "./ListContent";

const productsInitialState = {
	page: 1, // Store the index of next page to be fetched
	products: [], // Data to be rendered
	preFetchedProducts: [], // Store pre-emptivly fetched data
	loading: false,
	fetchState: "IDLE", // ENUM: IDLE | FETCHING | END
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
		const { page, sort, fetchState } = this.state;

		if (fetchState !== "IDLE") return;

		this.setState(() => ({ fetchState: "FETCHING" }));
		const products = await fetchProducts({
			page: reset ? 1 : page,
			sort,
		});

		// There is no more products to fetch
		if (products.length === 0) {
			this.setState(() => ({ fetchState: "END" }));
			return;
		}

		if (reset) this.setState(() => ({ products, page: 2 }));
		else
			this.setState((prevState) => ({
				preFetchedProducts: products,
				page: prevState.page + 1,
			}));
		this.setState(() => ({ fetchState: "IDLE" }));
	}

	async reachBottom() {
		const { preFetchedProducts, fetchState } = this.state;

		const isBottom =
			window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

		if (isBottom && fetchState !== "END") {
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
		this.getProducts(true);

		window.addEventListener("scroll", this.reachBottom, false);
	}

	componentDidUpdate() {
		const { loading, preFetchedProducts, fetchState } = this.state;

		if (fetchState === "END" && loading) this.setState({ loading: false });

		// If the pre-emptivly fetched data array is empty, fetch next page
		if (preFetchedProducts.length === 0) {
			this.getProducts();
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
		const { products, loading, page, fetchState } = this.state;

		return (
			<ContainerComponent>
				<GridComponent nColumns={3}>
					<ListContent list={products} reset={page === 1} />
				</GridComponent>
				<Loading loading={loading} />
				<EndListComponent show={fetchState === "END"} />
			</ContainerComponent>
		);
	}
}
