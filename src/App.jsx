import React, { useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import Form from "./components/Form";
import List from "./components/List";
import { v4 as uuidv4 } from "uuid";

const initialExpenses = [
  { id: uuidv4(), charge: "rent", amount: 1600 },
  { id: uuidv4(), charge: "car payment", amount: 400 },
  { id: uuidv4(), charge: "credit card bill", amount: 2000 },
];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  return (
    <>
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <Form />
        <List expenses={expenses} />
      </main>
      <h1>
        total spending:{" "}
        <span className="total">
          $
          {expenses.reduce((pre, cur) => {
            return (pre += cur.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}
export default App;
