import styled from "styled-components";
import React, { useState } from "react";

export const AddRecords = ({ onAdd }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(amount);
    setAmount("");
  };

  return (
    <div>
      <h2>Add Water Intake Record</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in ml"
          required
        />
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
}