import { useState } from "react";
import styled from "styled-components";

import "./App.css";

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 16px;
  margin-bottom: 8px;
  width: 90vw;
  margin: 1rem;
`;

function App() {
  return (
    <div className="app">
      <Input placeholder="Search by name email or role"></Input>
    </div>
  );
}

export default App;
