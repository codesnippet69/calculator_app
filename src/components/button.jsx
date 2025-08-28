import { useDispatch, useSelector } from "react-redux";
import {
  clearFields,
  deleteAtPos,
  evaluate,
  insertValue,
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
    const input = focus.current;
    const pos = input.selectionStart;
    if (val == "C") {
      dispatch(clearFields());
    } else if (val === "⌫") dispatch(deleteAtPos({ pos }));
    else if (val === "=") dispatch(evaluate());
    else dispatch(insertValue({ value: val, pos }));
    setTimeout(() => {
      input.focus();
      if (val === "⌫") {
        input.selectionStart = input.selectionEnd = pos > 0 ? pos - 1 : 0;
      } else if (val !== "=") {
        input.selectionStart = input.selectionEnd = pos + val.length;
      }
    }, 0);
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

  const getButtonClasses = (val) => {
    const base =
      "select-none rounded-lg border transition focus:outline-none focus:ring-2 px-3 py-2 text-sm sm:text-base";
    if (val === "=")
      return `${base} border-neutral-300 w-54 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-400 active:bg-neutral-300`;
    if (val === "C" || val === "⌫")
      return `${base} border-neutral-700 bg-neutral-700 text-neutral-100 hover:bg-neutral-600 hover:border-neutral-600 focus:ring-neutral-500 active:bg-neutral-500`;
    return `${base} border-neutral-700 bg-neutral-800 text-neutral-100 hover:bg-neutral-700 hover:border-neutral-600 focus:ring-neutral-500 active:bg-neutral-600`;
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xs sm:max-w-sm space-y-4">
        <input
          type="text"
          value={expression}
          onChange={(e) => dispatch(setExpression(e.target.value))}
          ref={focus}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 text-neutral-100 placeholder-neutral-400 px-4 py-3 outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition font-mono"
          placeholder="Enter expression"
        />
        <input
          type="text"
          value={result}
          placeholder="Result"
          readOnly
          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 placeholder-neutral-500 px-4 py-3 outline-none font-mono"
        />
        <div className="Buttons grid grid-cols-4 sm:grid-cols-7 gap-2">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={getButtonClasses(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Buttons;
