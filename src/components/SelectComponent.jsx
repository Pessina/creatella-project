import React from "react";
import Select from "react-select";

const SelectComponent = ({ options, onChange, ...props }) => {
	const styles = {
		control: (styles) => ({
			...styles,
			width: "200px",
		}),
	};

	return (
		<Select
			styles={styles}
			isSearchable={false}
			menuPlacement="top"
			options={options}
			onChange={onChange}
			placeholder="Sort by ..."
			{...props}
		/>
	);
};

export default SelectComponent;
