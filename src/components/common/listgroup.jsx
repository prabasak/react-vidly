import React from "react";

const ListGroup = props => {
  const { items, textProperty, valueProperty, selectedItem, onItemSelect } = props;
  return (
    <React.Fragment>
      <div className="list-group">
        {items.map(item => (
          <a key={item[valueProperty]}
            href="javascript:void(0);"
            onClick={() => onItemSelect(item)}
            className={selectedItem === item ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
          >
            {item[textProperty]}
          </a>
        ))}
      </div>
    </React.Fragment>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
