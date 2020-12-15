import React, { useState, useEffect } from "react";
import "./App.css";
import Alert from "./components/Alert";
import Form from "./components/Form";
import List from "./components/List";
import { v4 as uuidv4 } from "uuid";

// const initialExpenses = [
//   { id: uuidv4(), charge: "rent", amount: 1600 },
//   { id: uuidv4(), charge: "car payment", amount: 400 },
//   { id: uuidv4(), charge: "credit card bill", amount: 2000 },
// ];

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [isEdite, setIsEdite] = useState(false);
  const [alert, setAlert] = useState({ show: false });
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge && amount !== 0) {
      if (isEdite) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setIsEdite(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const newExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, newExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({ type: "danger", text: "blease enter valid values" });
    }
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const editItem = (id) => {
    const exactItem = expenses.find((item) => item.id === id);
    // console.log(exactItem);
    setCharge(exactItem.charge);
    setAmount(exactItem.amount);
    setIsEdite(true);
    setId(id);
  };

  const deleteItem = (id) => {
    const newList = expenses.filter((item) => item.id !== id);
    setExpenses(newList);
    handleAlert({ type: "danger", text: "item deleted" });
  };

  const clearList = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "cleared" });
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>budget calculator</h1>
      <main className="App">
        <Form
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          isEdite={isEdite}
        />
        <List
          expenses={expenses}
          deleteItem={deleteItem}
          editItem={editItem}
          clearList={clearList}
        />
      </main>
      <h1>
        total spending:{" "}
        <span className="total">
          $
          {expenses.reduce((pre, cur) => {
            return (pre += +cur.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}
export default App;
