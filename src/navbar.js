import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <nav className="poppins">
        <div className="logo">
          <h1>Stacker</h1>
        </div>
        <ul>
          <li>
            <a href="#" onClick={handleClickOpen("paper")}>
              Help
            </a>
          </li>
        </ul>
      </nav>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">Help</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            component={"div"}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}>
            <b>InFix Notation: </b>A mathematical notation in which operators
            are placed between operands.
            <br />
            <b>PreFix Notation: </b>Also known as Polish Notation, is a
            mathematical notation in which operators precede their operands.
            <br />
            <b>PostFix Notation: </b>Also known as Reverse Polish Notation, is a
            mathematical notation in which operators follow their operands.
            <br />
            <br />
            Practically, these are used in calculators, as they increase the
            speed of calculations.
            <br />
            <hr />
            <br />
            <b>Algorithms for conversion</b>
            <br />
            <br />
            <b>InFix to PostFix conversion: </b>
            <br />
            <ol>
              <li>
                Scan each element of the expression (X) from left to right and
                repeat steps 2 to 5 until the stack is empty.
              </li>
              <li>
                If an operand is encountered add it to the resultant string (Y).
              </li>
              <li>
                If a left parenthesis ( "(" ) is encountered then push it to the
                stack.
              </li>
              <li>If an operator is encountered then: </li>
              <ol type="a">
                <li>
                  Repeatedly pop from stack and add it to Y which has the same
                  or higher precedence than the next operator.
                </li>
                <li>Push operator to the stack.</li>
              </ol>
              <li>If a right parenthesis is encountered then: </li>
              <ol type="a">
                <li>
                  Repeatedly pop from the stack and to Y until a left
                  parenthesis is encountered.
                </li>
                <li>Pop the left parenthesis.</li>
              </ol>
              <li>END</li>
            </ol>
            <br />
            <br />
            <b>InFix to PreFix conversion: </b>
            <br />
            <ol>
              <li>
                Scan the expression (X) and reverse it, also replace "(" to ")"
                and vice versa.
              </li>
              <li>
                Perform InFix to PostFix conversion on the reversed expression.
              </li>
              <li>
                Finally, reverse the obtained PostFix expression, resulting in
                the PreFix expression.
              </li>
              <li>END</li>
            </ol>
            <br />
            <hr />
            <br />
            <b>Algorithms for evaluations </b>
            <br />
            <br />
            <b>PostFix evaluation: </b>
            <ol>
              <li>
                Scan the expression (X) from left to right and repeat steps 2 to
                4.
              </li>
              <li>
                If an operand is encountered then push the element to stack.
              </li>
              <li>
                If an operator is encountered then pop two operands and evaluate
                based on the operator.
              </li>
              <li>Push the answer to the stack.</li>
              <li>Finally, pop the element which is the answer.</li>
              <li>END</li>
            </ol>
            <br />
            <b>PreFix evaluation: </b>
            <ol>
              <li>Scan the expression (X) and reverse it.</li>
              <li>Perform PostFix evaluation on the expression.</li>
              <li>The resulting value is the answer.</li>
              <li>END</li>
            </ol>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              window.open("https://github.com/amaan-mohib/");
            }}
            color="primary"
            startIcon={
              <img
                src="https://github.githubassets.com/favicons/favicon.svg"
                width="20px"
              />
            }>
            GitHub
          </Button>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
