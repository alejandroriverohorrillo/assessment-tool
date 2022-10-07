import React, { useState } from "react";
import * as XLSX from "xlsx";
import * as EXCEL from 'exceljs';
import * as fs from 'file-saver';
let index = 0;
let data2; //variable para almacenar el json
let actualQuestion;

function Home() {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  var arrayData = [];
  //Reader of excel
  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    console.log("This file is: " + file);

    reader.onload = (evt) => {
      //Solución Parser
      const bstr1 = evt.target.result;
      const wb2 = XLSX.read(bstr1, { type: 'binary' });
      const wsname2 = wb2.SheetNames[2];
      const ws2 = wb2.Sheets[wsname2];
      console.log(ws2);
      data2 = XLSX.utils.sheet_to_json(ws2, { range: 8, raw: true, defval: "" });
      console.log("This data is: " + JSON.stringify(data2));
      const button = document.getElementById("loadButton");
      console.log(data2.length);
      button.removeAttribute("hidden");
    /*
    wb.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'candidate.xlsx');
    })
  
      //const list = wb.getWorksheet(1);
      //console.log(list);
      //console.log(result);
      //console.log(wb);
      /*
      const ws = wb.getWorksheet(1);
      console.log(ws);
      const prueba = ws.getCell('A1')
      console.log(prueba.value);

      //Solución libreria ExcelJS para coger el data validation
      //const wb0 = new ExcelJS.Workbook();
      //wb0.xlsx.readFile(fileName);
      //Primera solución sin parser
      /*
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
      */
    };

    reader.readAsBinaryString(file);

  };

  function hideBlock() {
    const container = document.getElementById("container");
    container.style.display = "none";
    displayQuestion();
  }
  function displayQuestion() {
    var questionCategory = document.getElementById("questionCategory");
    var questionQuestion = document.getElementById("questionQuestion");
    var questionRecommendation = document.getElementById("questionRecommendations");
    var acg = document.getElementById("selectNumber");
    var box = document.getElementById("open_q");
    var select = document.getElementById("selectNumber");
    var hgb = document.getElementById("questionsContainer");
    hgb.removeAttribute("hidden");
    /*var questionContainer = document.getElementById("questionBox");
    if (data2) {
      actualQuestion = function () {
        return (
          <div>
            {data2[index]["Category"]}
          </div>
        );
      }
      questionContainer.innerHTML=actualQuestion;
    }*/
    questionCategory.innerHTML = data2[index]["Category"];
    questionQuestion.innerHTML = data2[index]["Question"];
    questionRecommendation.innerHTML = data2[index]["Recommendation"];
    //questionAnswer.innerHTML=data2[index]["Answers"];
    var answer_options=String(data2[index]["Options"]);
    
    if(answer_options.length>2){

      box.style.display='none';
      acg.innerHTML="";
      var options=answer_options.split("; ");
      var select = document.getElementById("selectNumber");
      select.style.display='block';
      for(var i = 0; i < options.length; i++) {
          var opt = options[i];
          var el = document.createElement("button");
          el.className="optionButton";
          el.textContent = opt;
          el.value = opt;
          select.appendChild(el);
      }

      var optionButton = document.getElementsByClassName("optionButton");
	
		var addSelectClass = function(){
			removeSelectClass();
			this.classList.add('selected');	
		}

		var removeSelectClass = function(){
			for (var i =0; i < optionButton.length; i++) {
				optionButton[i].classList.remove('selected')
			}
		}
		
		for (var i =0; i < optionButton.length; i++) {
			optionButton[i].addEventListener("click",addSelectClass);
		}
    }
    else{
      select.style.display='none';
      box.style.display='block';
      
    }
  }
  function prevQuestion() {
    if (index > 0) {
      index--;
      displayQuestion();
    }

  }

  function nextQuestion() {
    if (index + 1 < (data2.length)) {
      index++;
      displayQuestion();
    }
  }

  

  return (
    <div className="home">
      <div id="container">
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
            <button onClick={hideBlock} id="loadButton" hidden>Edit this file</button>
          </div>
        </div>
      </div>
      <div id="questionsContainer" hidden>
        <button onClick={prevQuestion} id="prevQButton" className="qButton">Previous Question</button>
        <button onClick={nextQuestion} id="nextQButton" className="qButton">Next Question</button>
        <div id="questionCategory"></div>
        <div id="questionQuestion"></div>
        <div id="Answer">
        <div id="selectNumber">
          <div>Choose a number</div>
        </div>
        <input type="text" id="open_q"></input>
        </div>
        <div id="questionRecommendations"></div>
      </div>
    </div>
  );

}
export default Home;
