import React, {useState} from "react";
import * as XLSX from "xlsx";

function Home() {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  //Reader of excel
  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log("This file is: "+file);

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[2];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      console.log("This data is: "+data);
      const button= document.getElementById("loadButton");
      button.removeAttribute("hidden");
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
    </div>
  );
}

export default Home;
