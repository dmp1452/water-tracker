import React, { useState } from "react";
import styled from "styled-components";

export const DropDown = ({label, value, options, onSelect}) => {
    
    return (
        <label>
            {label}
            <select value = {value} onChange={e=>onChange(e.target.value)}>
                <option value="">Select {label} </option>
                {options.map(opt => (
                    <option key ={opt} value= {opt}>{opt}</option>
                ))}
            </select>
        </label>
    )
}