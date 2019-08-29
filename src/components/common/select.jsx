import React from "react";

const Select = ({ data, label, textProperty, valueProperty }) => {
	return (
		<div className="form-label-group">
			<select className="custom-select custom-select-lg">
				<option value="none">{label}</option>
				{data.map(item => (
					<option key={item[valueProperty]} value={item[textProperty].toLowerCase()}>{item[textProperty]}</option>
				))}
			</select>
		</div>
	);
};

Select.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Select;
