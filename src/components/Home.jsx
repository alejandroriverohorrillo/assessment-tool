import React, {useState} from "react";
import * as XLSX from "xlsx";
import { Workbook } from 'exceljs';

function Home() {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  var arrayData=[];
  //Reader of excel
  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    console.log("This file is: "+file);

    reader.onload = (evt) => {
      //Solución Parser
      const bstr1 = evt.target.result;
      const wb2 = XLSX.read(bstr1,{type: 'binary'});
      const wsname2 = wb2.SheetNames[2];
      const ws2 = wb2.Sheets[wsname2];
      console.log(ws2);
      let data2 = XLSX.utils.sheet_to_json(ws2, {range:8, raw:true, defval:""});
      console.log("This data is: "+JSON.stringify(data2));
      //Solución libreria ExcelJS para coger el data validation
      const wb0 = new ExcelJS.Workbook();
      wb0.xlsx.readFile(fileName);
      //Primera solución sin parser
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[2];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const dataString = data[8].toString();
      arrayData = dataString.split(",");
      console.log("This data is: "+arrayData[2]);
      const button= document.getElementById("loadButton");
      button.removeAttribute("hidden");
      document.getElementById("prueba").innerHTML = arrayData[1];
      document.getElementById("prueba1").innerHTML = arrayData[4];
      const value21 = ws.Cells(11,2).toString(); 
      console.log(value21);
    };

    reader.readAsBinaryString(file);
  };

  function hideBlock(){
    const container = document.getElementsByClassName("home")[0];
    container.style.display="none";
  }
  
  
  return (
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">Home page</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <input
              type="file"
              accept=".xls,.xlsx"
              value={selectedFile}
              onChange={onChange}
            />
            <button onClick={hideBlock } id="loadButton" hidden>Edit this file</button>
          </div>
        </div>
      </div>
      <div className="questions">
        <p>Pregunta 1</p>
        <p id="prueba">ua</p>
        <p id="prueba1">ua</p>

        

      </div>
    </div>
  );
}

export default Home;
