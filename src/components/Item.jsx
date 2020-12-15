import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const Item = ({ item, deleteItem, editItem }) => {
  const { id, charge, amount } = item;
  return (
    <>
      <li className="item">
        <div className="info">
          <span className="expense">{charge}</span>
          <span className="amount">${amount}</span>
        </div>
        <div>
          <button
            className="edit-btn"
            aria-label="edit button"
            onClick={() => editItem(id)}
          >
            <MdEdit />
          </button>
          <button
            className="clear-btn"
            aria-label="delete button"
            onClick={() => deleteItem(id)}
          >
            <MdDelete />
          </button>
        </div>
      </li>
    </>
  );
};

export default Item;
