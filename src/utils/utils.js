import { msDay, msSevendDays } from "./constants";

// Don't need to use random in 0 to 1000 range because server use % 10 on the value
export const randomImgNumber = () => {
	return Math.floor(Math.random() * 10);
};

export const shouldRenderAd = (i, interval) => {
	return i > 0 && i % interval === 0;
};

export const formatPrice = (price) => {
	return `$${price / 100}`;
};

// I'm assuming that I should format the date based only on days difference, ignoring the hours
// Eg: Given 2 dates
// Current Date: Jan/2/2020 01:00 am
// Product Date: Jan/1/2020 23:00 pm
// The date displayed in the product will be 1 day, even if the hour difference is 2 hours
export const formatDate = (date) => {
	const d = new Date();
	d.setHours(0, 0, 0, 0);
	const msDiff = d - Date.parse(date);
	if (msDiff < msSevendDays) {
		const daysDiff = Math.ceil(msDiff / msDay);
		switch (daysDiff) {
			case 0:
				return "today";
			case 1:
				return "1 day ago";
			default:
				return `${daysDiff} days ago`;
		}
	} else return date.split(" ").slice(1, 4).join("/");
};
