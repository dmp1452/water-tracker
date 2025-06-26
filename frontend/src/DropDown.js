import React, { useState } from "react";
import styled from "styled-components";


const getName =(num) => {
  const months = [
    '',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[num] || num;
}

export const DropDown = ({label, value, options, onChange}) => {
    
    return (
        <label>
            {label}
            <select value = {value} onChange={e=>onChange(e.target.value)}>
                <option value="">Select {label} </option>
                {options.map(opt => (
                    <option key ={opt} value= {opt}>{getName(opt)}</option>
                ))}
            </select>
        </label>
    )
}
