import React, { useEffect, useRef, useState } from "react";
import infixPostCon, { ConvertTable, infixPreCon } from "./convert";
import evaluate, { PostFixEvalTable, prefixEval } from "./stack";

const type = [
  { value: 1, label: "Convert" },
  { value: 2, label: "Evaluate" },
];
const evaluationTypes = [
  { value: 0, label: "PostFix" },
  { value: 1, label: "PreFix" },
];
const convertTypes = [
  { value: 0, label: "InFix -> PostFix" },
  { value: 1, label: "InFix -> PreFix" },
];

let operation, operationType;

export default function Type() {
  // let infoDiv;
  // useEffect(() => {
  //   infoDiv = document.getElementById("info");
  // });

  const [selectedType, setSelectedType] = useState(type[0].value);
  const [exp, setExp] = useState("");
  const [tbody, setTBody] = useState(<div></div>);
  const btnRef = useRef(null);

  var select2, info;
  if (selectedType == 1) {
    select2 = <CheckType type={convertTypes} />;
    info = <Info text="A + B / C * ( D - A ) ^ F ^ H" />;
    operationType = "Convert";
  } else if (selectedType == 2) {
    select2 = <CheckType type={evaluationTypes} />;
    info = <Info text="4 55 + 62 23 - *" />;
    operationType = "Evaluate";
  }

  const handlePress = (e) => {
    var code = e.keyCode || e.which;
    if (code === 13) {
      btnRef.current.click();
    }
  };

  function handleClick(operationType, exp) {
    const answer = document.getElementById("answer");
    const answerDiv = document.getElementById("answerDiv");
    answerDiv.style.display = "flex";
    if (operationType === "Evaluate") {
      let res;
      if (operation == "PostFix") {
        res = evaluate(exp, operation);
        setTBody(<PostFixEvalTable exp={exp} operation={operation} />);
      }
      if (operation == "PreFix") {
        res = prefixEval(exp, operation);
        setTBody(
          <PostFixEvalTable exp={exp} operation={operation + " (reversed)"} />
        );
      }
      console.log(res);
      answer.innerHTML =
        res !== undefined && !isNaN(res)
          ? `Answer: <b>${res}</b>`
          : "Please enter a valid expression.";
    }
    if (operationType === "Convert") {
      let res;
      if (operation == "InFix -> PostFix") {
        res = infixPostCon(exp);
        setTBody(<ConvertTable operation={operation} str="PostFix" />);
      }
      if (operation == "InFix -> PreFix") {
        res = infixPreCon(exp);
        setTBody(
          <ConvertTable operation={operation} str="PreFix (reversed)" />
        );
      }
      //answer.innerHTML = `Answer: <b>${res}</b>`;
      answer.innerHTML =
        res !== undefined
          ? `Answer: <b>${res}</b>`
          : "Please enter a valid expression.";
    }
  }
  return (
    <div className="typeHead">
      <div className="type poppins">
        <div>
          <label htmlFor="type">Select type:</label>
          <select
            tabIndex="1"
            value={selectedType}
            className="dropdown poppins"
            id="type"
            name="type"
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}>
            {type.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {select2}
        </div>
        <div>
          <input
            tabIndex="3"
            value={exp}
            size="25"
            placeholder="Expression"
            className="textBox"
            type="text"
            id="value"
            name="value"
            onKeyPress={handlePress}
            onChange={(e) => setExp(e.target.value)}></input>
          <button
            tabIndex="4"
            className="poppins evalBut"
            ref={btnRef}
            onClick={() => handleClick(operationType, exp)}>
            {operationType}
          </button>
        </div>
        {info}
      </div>
      <div
        id="answerDiv"
        className="answer poppins"
        style={{ display: "none" }}>
        <p id="answer"></p>
      </div>
      {tbody}
      <div style={{ height: "20px", width: "100%" }}></div>
    </div>
  );
}
function CheckType(props) {
  const [selectedValue, setSelectedValue] = useState(props.type[0].value);
  operation = props.type[selectedValue].label;
  return (
    <select
      tabIndex="2"
      className="dropdown poppins"
      id="convert"
      name="convert"
      onChange={(e) => setSelectedValue(e.target.value)}>
      {props.type.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
function Info(props) {
  return (
    <div className="info">
      <span className="material-icons" style={{ margin: 0 }}>
        info_outline
      </span>
      <p>
        Use <b>space</b> in the whole expression if it contains{" "}
        <b>multi-digit numbers</b>.<br />
        Example: <b style={{ fontFamily: "monospace" }}>{props.text}</b>
      </p>
    </div>
  );
}
