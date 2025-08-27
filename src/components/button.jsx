import { useDispatch, useSelector } from "react-redux";
import {
  clearFields,
  backSpace,
  evaluate,
  appendValue,
  setExpression,
} from "../redux/slices/slices";
import { useEffect, useRef } from "react";

function Buttons() {
  const expression = useSelector((state) => state.calculator.expression);
  const result = useSelector((state) => state.calculator.result);
  const dispatch = useDispatch();
  const focus = useRef(null);
  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "sin(",
    "cos(",
    "tan(",
    "(",
    "4",
    "5",
    "6",
    "*",
    "sqrt(",
    "^",
    ")",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "+",
    "⌫",
    "C",
    "=",
  ];
  const handleClick = (val) => {
    if (val == "C") {
      dispatch(clearFields());
    } else if (val === "⌫") dispatch(backSpace());
    else if (val === "=") dispatch(evaluate());
    else dispatch(appendValue(val));
  };

  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key;
      if (key === "Enter") {
        dispatch(evaluate());
      } else if (key === "Escape") {
        dispatch(clearFields());
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dispatch]);

  useEffect(() => {
    if (focus.current) {
      focus.current.focus();
    }
  }, []);

  return (
    <>
      <input
        type="text"
        value={expression}
        onChange={(e) => dispatch(setExpression(e.target.value))}
        ref={focus}
      />
      <br />
      <input type="text" value={result} placeholder="Result" readOnly />

      <div className="Buttons">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </>
  );
}

export default Buttons;
