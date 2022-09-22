import { useState } from "react";
import styled from "styled-components";

function Submit() {
  const [assessmentFile, setAssessmentFile] = useState(null);
  const changeImage = (e) => {
    console.log(e.target.files);
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      const startButton = document.getElementById("startButton");
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        startButton.onclick = (v) => {
          e.preventDefault();
          setAssessmentFile(e.target.result); // le damos el binario de la imagen para mostrarla en pantalla
          startButton.style.display = "none";
        };
      };
    }
  };
  return (
    <div>
      <StyleDragArea>
        <br />
        <div className="image-upload-wrap">
          <input
            className="file-upload-input"
            type="file"
            accept=".xls,.xlsx"
            multiple
            onChange={(e) => {
              changeImage(e);
              (e) => setFile(e.target.value);
            }}
          />

          <div className="text-information">
            <h3>Drag and drop a file or select add Image</h3>
          </div>
        </div>

        <div className="center">
          <div text={}></div>
        </div>
      </StyleDragArea>
    </div>
  );
}

export default Submit;

const StyleDragArea = styled.div`
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .file-upload-content {
    display: none;
    text-align: center;
  }

  .file-upload-input {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    cursor: pointer;
  }

  .image-upload-wrap {
    position: relative;
    height: 100px;
    border: 4px solid #d0d7de;
    margin-left: 10px;
    margin-right: 10px;
  }

  .image-upload-wrap:hover {
    background-color: transparent;
    border: 4px dashed #d0d7de;
  }
  .text-information {
    margin-top: 30px;
    text-align: center;
  }
`;
