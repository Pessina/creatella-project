// Don't need to use random in 0 to 1000 range because server use % 10 on the value
export const randomImgNumber = () => {
	return Math.floor(Math.random() * 10);
};

export const shouldRenderAd = (i, interval) => {
	return i > 0 && i % interval === 0;
};
