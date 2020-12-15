import React from "react";
import Item from "./Item";
import { MdDelete } from "react-icons/md";
const List = ({ expenses, deleteItem, editItem, clearList }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((item) => {
          return (
            <Item
              key={item.id}
              item={item}
              deleteItem={deleteItem}
              editItem={editItem}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearList}>
          clear all <MdDelete className="btn-icon" />{" "}
        </button>
      )}
    </>
  );
};

export default List;
