export const randomImgNumber = () => {
	return Math.floor(Math.random() * 10);
};

export const renderAd = (i) => {
	return i > 0 && i % 20 === 0;
};
