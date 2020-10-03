import React from "react";

let stack = [];
let data = [];

export default function infixPostCon(exp) {
  stack = [];
  let rows = [];
  let i = 0;
  let res = [];
  let spaceExp = exp.split(" ");
  if (spaceExp.length > 1) exp = spaceExp;
  for (const c of exp) {
    if (!isNaN(c) || isAlpha(c)) res[i++] = c;
    else {
      switch (c) {
        case "(":
          stack.push(c);
          break;
        case "$":
        case "^":
          while (
            stack[stack.length - 1] === "$" ||
            stack[stack.length - 1] === "^"
          ) {
            res[i++] = stack.pop();
          }
          stack.push(c);
          break;
        case "/":
        case "*":
          while (
            stack[stack.length - 1] === "$" ||
            stack[stack.length - 1] === "^" ||
            stack[stack.length - 1] === "/" ||
            stack[stack.length - 1] === "*"
          ) {
            res[i++] = stack.pop();
          }
          stack.push(c);
          break;
        case "+":
        case "-":
          while (
            stack[stack.length - 1] === "$" ||
            stack[stack.length - 1] === "^" ||
            stack[stack.length - 1] === "/" ||
            stack[stack.length - 1] === "*" ||
            stack[stack.length - 1] === "+" ||
            stack[stack.length - 1] === "-"
          ) {
            res[i++] = stack.pop();
          }
          stack.push(c);
          break;
        case ")":
          while (stack[stack.length - 1] !== "(") res[i++] = stack.pop();
          stack.pop();
          break;
        default:
          break;
      }
    }
    rows.push({
      symbol: c,
      str: `${res.join(" ")}`,
      opstack: `${stack.join(" ")}`,
    });
  }
  while (stack.length !== 0) {
    res[i++] = stack.pop();
  }
  rows.push({
    symbol: "",
    str: `${res.join(" ")}`,
    opstack: "",
  });
  data = rows;
  console.log(res);
  return res.join(" ");
}

export function infixPreCon(exp) {
  let revInfix,
    newRevInfix = "";
  let spaceExp = exp.split(" ");
  if (!(spaceExp.length > 1)) {
    revInfix = exp.split("").reverse().join("");
  } else revInfix = spaceExp.reverse().join(" ");
  for (const c of revInfix) {
    if (c === "(") newRevInfix += ")";
    else if (c === ")") newRevInfix += "(";
    else newRevInfix += c;
  }
  newRevInfix = newRevInfix.trim();
  let postfix = infixPostCon(newRevInfix);
  console.log(newRevInfix.trim());
  data.push({
    symbol: "Answer",
    str: `${postfix.split("").reverse().join("")}`,
    opstack: "",
  });
  return postfix.split("").reverse().join("");
}

function isAlpha(ch) {
  return /^[A-Z]$/i.test(ch);
}

export function ConvertTable(props) {
  return (
    <div id="tableDiv" className="tableDiv poppins">
      <span>{props.operation + " Conversion Table"}</span>
      <table className="table convert">
        <tbody>
          <tr>
            <th>Symbol</th>
            <th>{props.str + " String"}</th>
            <th>Operation Stack</th>
          </tr>
          {data.map((d, index) => (
            <tr key={index}>
              <td>{`${d.symbol}`}</td>
              <td>{`${d.str}`}</td>
              <td>{`${d.opstack}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
