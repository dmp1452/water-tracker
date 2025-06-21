import styled from "styled-components";
import React, { useState } from "react";

const StyledDiv = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  margin: 12px;
  max-width: 400px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
`

const StyledButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #5e88c6;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4a74b1;
  }
`

export const AddRecords = ({ onAdd }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(amount);
    setAmount("");
  };

  return (
    <StyledDiv>
      <h2>Add Water Intake Record</h2>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in ml"
          required
        />
        <StyledButton type="submit">Add Record</StyledButton>
      </StyledForm>
    </StyledDiv>
  );
};
