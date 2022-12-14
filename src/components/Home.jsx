import React, { useState } from "react";
import * as XLSX from "xlsx";

let index = 0;
let data2;
let wb2; //variable para almacenar el json

function Home() {
  
  const [selectedFile] = useState(null);

  //Reader of excel
  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    console.log("This file is: " + file);

    reader.onload = (evt) => {
      //Solución Parser
      const bstr1 = evt.target.result;
      wb2 = XLSX.read(bstr1, { type: 'binary' });
      const wsname2 = wb2.SheetNames[2];
      const ws2 = wb2.Sheets[wsname2];
      console.log(ws2);
      data2 = XLSX.utils.sheet_to_json(ws2, { range: 8, raw: true, defval: "" });
      console.log("This data is: " + JSON.stringify(data2));
      const button = document.getElementById("loadButton");
      console.log(data2.length);
      button.removeAttribute("hidden");
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
    var box_button = document.getElementById("open_q_save");
    var comment = document.getElementById("comment");
    var comment_bottom = document.getElementById("comment_save");
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
    var answer_options = String(data2[index]["Options"]);
    if (answer_options.length > 2) {
      box.style.display = 'none';
      box_button.style.display = 'none';
      acg.innerHTML = "";
      var options = answer_options.split("; ");
      var select = document.getElementById("selectNumber");
      select.style.display = 'block';
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("button");
        el.className = "optionButton";
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
      var optionButton = document.getElementsByClassName("optionButton");
      var text = data2[index]["Answer"];

      for (var i = 0; i < optionButton.length; i++) {
        if (optionButton[i].innerHTML === text) {
          optionButton[i].classList.add('selected');
        }
      }
      var addSelectClass = function () {
        removeSelectClass();
        this.classList.add('selected');
        data2[index]["Answer"] = this.value;
        console.log(data2[index]["Answer"]);
      }
      var removeSelectClass = function () {
        for (var i = 0; i < optionButton.length; i++) {
          optionButton[i].classList.remove('selected');
        }
      }
      for (var i = 0; i < optionButton.length; i++) {
        optionButton[i].addEventListener("click", addSelectClass);
      }
    }
    else {
      select.style.display = 'none';
      box.style.display = 'block';
      box.value = data2[index]["Answer"];
      box_button.style.display = 'block';
    }
    comment.style.display = 'block';
    comment.value = data2[index]["Comment"];
    comment_bottom.style.display = 'block';
  }
  function downloadExcel() {
    const workbook = wb2;
    const wsname2 = workbook.SheetNames[2];
    const ws2 = wb2.Sheets[wsname2];
    //Write answers into
    var number_cell = 10;
    for (var i = 0; i < data2.length; i++) {
      var answer_cell = 'C' + String(number_cell + i);
      var comment_cell = 'D' + String(number_cell + i);
      var score_cell = 'G' + String(number_cell + i);
      //console.log(i + "+ronda");
      if (ws2[answer_cell] === undefined) {
        XLSX.utils.sheet_add_aoa(ws2, [['']], { origin: answer_cell });
      }
      if (ws2[comment_cell] === undefined) {
        XLSX.utils.sheet_add_aoa(ws2, [['']], { origin: comment_cell });
      }
      /*
      console.log("el valor de cell: " + cell);
      console.log("Celda actual: " + answer_cell);
      */
      ws2[answer_cell].v = data2[i]["Answer"];
      ws2[comment_cell].v = data2[i]["Comment"];
      console.log(ws2[answer_cell].v);
      console.log(ws2[comment_cell].v);
      console.log(ws2[score_cell].v)
    }
    /*
    ws2.workbook.write
    XLSX.utils.
    XLSX.utils.book_append_sheet(workbook, worksheet, "Result");
    let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    */
    XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
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
  function saveOpenAnswers() {
    var openResult = document.getElementById("open_q");
    data2[index]["Answer"] = openResult.value;
    alert("Answer Saved");
    console.log(data2[index]["Answer"]);
  }
  function saveComment() {
    var openResult = document.getElementById("comment");
    data2[index]["Comment"] = openResult.value;
    alert("Comment Saved");
    console.log(data2[index]["Comment"]);
  }
  const generateReport =()=> {
  
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
        <button onClick={downloadExcel} id="saveQButton" className="qButton">Save Assessment</button>
        <div id="questionCategory"></div>
        <div id="questionQuestion"></div>
        <div id="Answer">
          <div id="selectNumber">
            <div>Choose a number</div>
          </div>
          <input type="text" id="open_q" className="open_text"></input>
          <button onClick={saveOpenAnswers} id="open_q_save">Save open answer</button>
          <div>Comment</div>
          <input type="text" id="comment" ></input>
          <button onClick={saveComment} id="comment_save">Save Comment</button>
        </div>
        <div id="questionRecommendations"></div>
      </div>
      <button onClick={generateReport} id="reportButton" className="qButton">Generate Report</button>
    </div>
  );

}
export default Home;
