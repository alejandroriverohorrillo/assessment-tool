import "./styles.css";
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Upload, Button } from "antd";
import Submit from "./components/Submit";
const { Dragger } = Upload;
//Library for excel
const ExcelJS = require("exceljs");
export default function App() {
  const [name, setName] = useState();
  const navigate = useNavigate();
  const navigateToFill = () => {
    // 👇️ navigate to /contacts
    navigate("/fill");
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Submit />
      <button onClick={navigateToFill} id="startButton">
        Start
      </button>
    </div>
  );
}

//Create assessment
