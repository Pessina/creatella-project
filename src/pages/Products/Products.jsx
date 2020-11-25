import React from "react";
import { fetchProducts } from "../../utils/data";
import GridComponent from "../../components/GridComponent";
import ContainerComponent from "../../components/ContainerComponent";
import Loading from "../../components/Loading";
import MessageComponent from "../../components/MessageComponent";
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
	fetchState: "IDLE", // ENUM: IDLE | FETCHING | END (fetch last page) | ERROR
};

export default class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = productsInitialState;

		this.getProducts = this.getProducts.bind(this);
		this.reachBottom = this.reachBottom.bind(this);
		this.sortChange = this.sortChange.bind(this);
	}

	// reset - true: fetch page 1 || false: append products and add 1 to page
	async getProducts(reset = false) {
		const { sort, page, fetchState } = this.state;

		if (fetchState !== "IDLE") return;

		this.setState(() => ({ fetchState: "FETCHING" }));
		const products = await fetchProducts({
			page: reset ? 1 : page,
			sort,
		});

		// There is no more products to fetch
		if (products?.length === 0)
			return this.setState(() => ({ fetchState: "END" }));

		// There is some error on request
		if (!products) return this.setState(() => ({ fetchState: "ERROR" }));

		if (reset) {
			this.setState(() => ({ preFetchedProducts: [], products, page: 2 }));
		} else {
			this.setState((prevState) => ({
				preFetchedProducts: products,
				page: prevState.page + 1,
			}));
		}

		this.setState(() => ({ fetchState: "IDLE" }));
	}

	reachBottom() {
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

	sortChange(selected) {
		this.setState(() => ({
			...productsInitialState,
			sort: selected.value,
		}));
	}

	componentDidMount() {
		this.getProducts(true);

		window.addEventListener("scroll", this.reachBottom, false);
	}

	componentDidUpdate(prevProps, prevState) {
		const { loading, preFetchedProducts, sort, fetchState } = this.state;

		if (fetchState === "END" && loading) this.setState({ loading: false });

		// If the pre-emptivly fetched data array is empty, fetch next page
		if (preFetchedProducts?.length === 0) {
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
		const { products, loading, fetchState } = this.state;

		return (
			<ContainerComponent>
				<GridComponent>
					<ListContent
						list={products}
						reset={products?.length === 0 && fetchState !== "END"}
					/>
				</GridComponent>
				<Loading loading={loading} />
				<MessageComponent
					show={fetchState === "END"}
					message={"End of catalog"}
				/>
				<MessageComponent
					show={fetchState === "ERROR"}
					message={
						"Something went wrong. Reload the page or check the server connection"
					}
				/>
				<FooterComponent>
					<SelectComponent
						isDisabled={fetchState === "FETCHING"}
						options={sortOptions}
						onChange={this.sortChange}
					/>
				</FooterComponent>
			</ContainerComponent>
		);
	}
}
