import React from "react";
let stack = [];
let op1, op2, res, data;
export default function evaluate(exp, operation) {
  let rows = [];
  stack = [];
  let spaceExp = exp.split(" ");
  if (spaceExp.length > 1) exp = spaceExp;
  for (const c of exp) {
    if (!isNaN(c)) stack.push(parseInt(c, 10));
    else {
      // op2 = stack.pop();
      // op1 = stack.pop();
      if (operation == "PostFix") popInPost();
      if (operation == "PreFix") popInPre();
      res = compute(op1, op2, c);
      stack.push(res);
    }
    rows.push({
      symbol: c,
      opr1: op1,
      opr2: op2,
      value: res,
      Opstack: `${stack}`,
    });
    op1 = undefined;
    op2 = undefined;
    res = undefined;
  }
  var answer = stack.pop();
  data = rows;
  return answer;
}
function popInPost() {
  op2 = stack.pop();
  op1 = stack.pop();
}
function popInPre() {
  op1 = stack.pop();
  op2 = stack.pop();
}
function compute(operand1, operand2, operator) {
  let op1 = parseFloat(operand1);
  let op2 = parseFloat(operand2);
  switch (operator) {
    case "+":
      return op1 + op2;
    case "-":
      return op1 - op2;
    case "*":
      return op1 * op2;
    case "/":
      return op1 / op2;
    case "$":
    case "^":
      return op1 ** op2;
  }
}

export function prefixEval(exp, operation) {
  let spaceExp = exp.split(" ");
  if (!(spaceExp.length > 1)) {
    let revExp = exp.split("").reverse().join("");
    return evaluate(revExp, operation);
  } else return evaluate(spaceExp.reverse().join(" "), operation);
}

export function PostFixEvalTable(props) {
  return (
    <div id="tableDiv" className="tableDiv poppins">
      <span>{props.operation + " Evaluation Table"}</span>
      <table className="table">
        <tbody>
          <tr>
            <th>Symbol</th>
            <th>Operand 1</th>
            <th>Operand 2</th>
            <th>Value</th>
            <th>Operation Stack</th>
          </tr>
          {data.map((d, index) => (
            <tr key={index}>
              <td>{`${d.symbol}`}</td>
              <td>
                {d.opr1 !== undefined && !isNaN(d.opr1) ? `${d.opr1}` : ""}
              </td>
              <td>
                {d.opr2 !== undefined && !isNaN(d.opr2) ? `${d.opr2}` : ""}
              </td>
              <td>
                {d.value !== undefined && !isNaN(d.value) ? `${d.value}` : ""}
              </td>
              <td>{`${d.Opstack}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
