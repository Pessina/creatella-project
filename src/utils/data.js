import axios from "axios";
import { servAddr } from "./constants";
import { randomImgNumber } from "./utils";

export async function fetchProducts({ page = null, sort = null }) {
	let params = {};
	if (page) params = { ...params, _page: page };
	if (sort) params = { ...params, _sort: sort };

	try {
		const { data } = await axios.get(`${servAddr}/api/products`, {
			params,
		});
		return data;
	} catch (e) {
		console.log(e);
	}
}

export class Ads {
	constructor() {
		this.lastAdNumber = null;
	}

	generateNewAdNumber() {
		let adNumber = randomImgNumber();
		while (adNumber === this.lastAdNumber) adNumber = randomImgNumber();
		this.lastAdNumber = adNumber;
		return adNumber;
	}

	fetchAd() {
		return `${servAddr}/ads?r=${this.generateNewAdNumber()}`;
	}
}
