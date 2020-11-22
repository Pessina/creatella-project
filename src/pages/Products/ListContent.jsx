import React, { useEffect, useState } from "react";
import { shouldRenderAd } from "../../utils/utils";
import ProductCard from "../../components/ProductCard.jsx";
import AdCard from "../../components/AdCard";
import { ads } from "../../utils/data";

const ListContent = ({ list = [], reset = false }) => {
	const [currList, setCurrList] = useState([]);

	// Append new elemnents to list (avoiding re-render)
	const renderList = (nL, iInitial) => {
		return nL.map((el, i) => (
			// Cannot use ID as key because database ID it's not unique
			<React.Fragment key={i + iInitial}>
				<ProductCard {...el} />
				{shouldRenderAd(i + iInitial + 1, 20) && <AdCard ad={ads.fetchAd()} />}
			</React.Fragment>
		));
	};

	useEffect(() => {
		if (reset) setCurrList(renderList(list, 0));
		else setCurrList([...currList, ...renderList(list, currList.length)]);
	}, [list, reset]);

	return <>{currList}</>;
};

export default ListContent;
