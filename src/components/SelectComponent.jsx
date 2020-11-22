import React from "react";
import Select from "react-select";

const SelectComponent = ({ options, onChange }) => {
	const styles = {
		control: (styles) => ({
			...styles,
			width: "200px",
		}),
	};

	return (
		<Select
			styles={styles}
			menuPlacement="top"
			options={options}
			onChange={onChange}
			placeholder="Sort by ..."
		/>
	);
};

export default SelectComponent;
