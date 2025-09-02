import { useDispatch, useSelector } from "react-redux";
import {
  clearFields,
  deleteAtPos,
  evaluate,
  insertValue,
  setExpression,
  addCustomVariable,
  setTempVarName,
  setTempVarValue,
  clearTempVarInputs,
} from "../redux/slices/slices";
import { useEffect, useRef, useState } from "react";
import ExpressionInput from "./ExpressionInput";
import ResultDisplay from "./ResultDisplay";
import type { RootState } from "../redux/store";

function Buttons() {
  const expression = useSelector(
    (state: RootState) => state.calculator.expression
  );
  const result = useSelector((state: RootState) => state.calculator.result);
  const customVars = useSelector(
    (state: RootState) => state.calculator.customVariable
  );
  const tempVarName = useSelector(
    (state: RootState) => state.calculator.tempVarName || ""
  );
  const tempVarValue = useSelector(
    (state: RootState) => state.calculator.tempVarValue || ""
  );
  const dispatch = useDispatch();
  const focus = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const buttons = [
    "sin(",
    "cos(",
    "tan(",
    "sqrt(",
    "C",
    "⌫",
    "(",
    ")",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "^",
    "=",
    "Pi",
    "e",
  ];
  const handleClick = (val: string) => {
    const input = focus.current as HTMLInputElement;
    const pos = input?.selectionStart ?? 0;
    if (val == "C") {
      dispatch(clearFields());
      setIsEditing(false);
    } else if (val === "⌫") dispatch(deleteAtPos({ pos }));
    else if (val === "=") {
      dispatch(evaluate());
      setIsEditing(false);
    } else {
      dispatch(insertValue({ value: val, pos }));
      setIsEditing(true);
    }
    setTimeout(() => {
      input?.focus();
      if (!input) return;
      if (val === "⌫") {
        input.selectionStart = input.selectionEnd = pos > 0 ? pos - 1 : 0;
      } else if (val !== "=") {
        input.selectionStart = input.selectionEnd = pos + val.length;
      }
    }, 0);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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

  const getButtonClasses = (val: string) => {
    const base =
      "select-none rounded-xl border transition focus:outline-none focus:ring-2 px-3 py-3 text-sm sm:px-4 sm:py-4 sm:text-base h-12 sm:h-14 md:h-16 shadow-sm";
    if (val === "=")
      return `${base} border-emerald-300 bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400 active:bg-emerald-700`;
    if (val === "C" || val === "⌫")
      return `${base} border-orange-200 bg-orange-100 text-orange-800 hover:bg-orange-200 focus:ring-orange-300 active:bg-orange-300`;
    return `${base} border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-300 active:bg-slate-300`;
  };

  return (
    <div className="w-full flex items-start justify-center p-3 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-slate-700 text-white px-6 py-6">
          <div className="space-y-3">
            <ExpressionInput
              value={expression}
              onChange={(val) => {
                dispatch(setExpression(val));
                setIsEditing(true);
              }}
              onFocus={() => setIsEditing(true)}
              isEditing={isEditing}
              ref={focus}
            />
            <ResultDisplay value={result} />
            <div className="grid grid-cols-5 gap-2">
              <input
                type="text"
                value={tempVarName}
                onChange={(e) => dispatch(setTempVarName(e.target.value))}
                className="col-span-2 w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition"
                placeholder="var (e.g. a)"
              />
              <input
                type="number"
                value={tempVarValue}
                onChange={(e) => dispatch(setTempVarValue(e.target.value))}
                className="col-span-2 w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition"
                placeholder="value"
              />
              <button
                type="button"
                onClick={() => {
                  const name = (tempVarName || "").trim();
                  const value = (tempVarValue || "").trim();
                  if (!name || value === "") return;
                  dispatch(addCustomVariable({ variabel: name, value }));
                  dispatch(clearTempVarInputs());
                }}
                className="rounded-xl border border-emerald-300 bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-400 px-3 py-2"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="px-3 sm:px-5 pb-5 pt-4 bg-slate-50">
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
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
          {customVars.length > 0 && (
            <div className="mt-4">
              <div className="text-slate-500 text-sm mb-2">Variables</div>
              <div className="flex flex-wrap gap-2">
                {customVars.map((v, idx) => (
                  <span
                    onClick={() => handleClick(v.variabel)}
                    key={`${v.variabel}-${idx}`}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs px-3 py-1 cursor-pointer"
                  >
                    {v.variabel} = {v.value}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Buttons;
