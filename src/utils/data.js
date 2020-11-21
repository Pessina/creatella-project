import axios from "axios";
import { servAddr } from "./constants";
import { randomImgNumber } from "./utils";

export async function fetchProducts({ page = null, sort = null, limit = 20 }) {
	let params = {};
	if (page) params = { ...params, _page: page };
	if (sort) params = { ...params, _sort: sort };
	if (limit) params = { ...params, _limit: limit };

	try {
		const { data } = await axios.get(`${servAddr}/api/products`, {
			params,
		});
		return data;
	} catch (e) {
		console.log(`Error: ${e}`);
	}
}

class Ads {
	constructor() {
		this.lastAdNumber = null;
	}

	// Avoid same ad twice in a row
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

export const ads = new Ads();
