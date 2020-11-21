import React, { useEffect, useState } from "react";
import { renderAd } from "../../utils/utils";
import ProductCard from "../../components/ProductCard.jsx";
import AdCard from "../../components/AdCard";
import { Ads } from "../../utils/data";

const ListComponent = ({ list, reset }) => {
	const [currList, setRenderList] = useState([]);
	const [ads] = useState(new Ads());

	const renderList = (nL, iInitial) => {
		return nL.map((el, i) => (
			<div key={i + iInitial}>
				{renderAd(i + iInitial + 1 - iInitial / 20) ? (
					<AdCard ad={ads.fetchAd()} />
				) : (
					<ProductCard {...el} />
				)}
			</div>
		));
	};

	useEffect(() => {
		if (reset) setRenderList(renderList(list, currList.length));
		else setRenderList([...currList, ...renderList(list, currList.length)]);
	}, [list, reset]);

	return <>{currList}</>;
};

export default ListComponent;
