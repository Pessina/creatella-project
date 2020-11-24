import React from "react";
import { fetchProducts } from "../../utils/data";
import GridComponent from "../../components/GridComponent";
import ContainerComponent from "../../components/ContainerComponent";
import Loading from "../../components/Loading";
import EndListComponent from "../../components/EndListComponent";
import ListContent from "./ListContent";
import FooterComponent from "../../components/FooterComponent";
import { sortOptions } from "../../utils/constants";
import SelectComponent from "../../components/SelectComponent";

const productsInitialState = {
	page: 1, // Store the index of next page to be fetched
	products: [], // Data to be rendered
	preFetchedProducts: [], // Store pre-emptivly fetched data
	sort: null,
	loading: false,
};

export default class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = productsInitialState;
		this.fetchState = "IDLE"; // ENUM: IDLE | FETCHING | END (fetch last page)

		this.getProducts = this.getProducts.bind(this);
		this.reachBottom = this.reachBottom.bind(this);
		this.sortChange = this.sortChange.bind(this);
	}

	// reset - true: fetch page 1 || false: append products and add 1 to page
	async getProducts(reset = false) {
		const { sort, page } = this.state;

		// TODO: Check if this can lead to error, because reset ignore fetchState
		if (this.fetchState !== "IDLE" && !reset) return;

		this.fetchState = "FETCHING";
		const products = await fetchProducts({
			page: reset ? 1 : page,
			sort,
		});
		this.fetchState = "IDLE";

		// There is no more products to fetch
		if (products.length === 0) {
			this.fetchState = "END";
		}

		if (reset) {
			this.setState(() => ({ preFetchedProducts: [], products, page: 2 }));
		} else {
			this.setState((prevState) => ({
				preFetchedProducts: products,
				page: prevState.page + 1,
			}));
		}
	}

	reachBottom() {
		const { preFetchedProducts } = this.state;

		const isBottom =
			window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

		if (isBottom && this.fetchState !== "END") {
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

	sortChange(selected) {
		this.setState(() => ({
			sort: selected.value,
			loading: true,
			products: [],
			preFetchedProducts: [],
		}));
	}

	componentDidMount() {
		this.getProducts(true);

		window.addEventListener("scroll", this.reachBottom, false);
	}

	componentDidUpdate(prevProps, prevState) {
		const { loading, preFetchedProducts, sort } = this.state;

		if (this.fetchState === "END" && loading) this.setState({ loading: false });

		// If the pre-emptivly fetched data array is empty, fetch next page
		if (preFetchedProducts.length === 0) {
			this.getProducts(prevState.sort !== sort);
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
		const { products, loading } = this.state;

		return (
			<ContainerComponent>
				<GridComponent>
					<ListContent
						list={products}
						reset={products.length === 0 && this.fetchState !== "END"}
					/>
				</GridComponent>
				<Loading loading={loading} />
				<EndListComponent show={this.fetchState === "END"} />
				<FooterComponent>
					<SelectComponent options={sortOptions} onChange={this.sortChange} />
				</FooterComponent>
			</ContainerComponent>
		);
	}
}
