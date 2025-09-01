import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type HistoryItem = { expression: string; result: string };
type customVariable = { variabel: string; value: string };

interface CalculatorState {
  expression: string;
  result: string;
  history: HistoryItem[];
  customVariable: customVariable[];
  tempVarName?: string;
  tempVarValue?: string;
}

const initialState: CalculatorState = {
  expression: "",
  result: "",
  history: [],
  customVariable: [],
  tempVarName: "",
  tempVarValue: "",
};

const calcSlice = createSlice({
  initialState,
  name: "calculator",

  reducers: {
    addCustomVariable: (
      state,
      action: PayloadAction<{ variabel: string; value: string }>
    ) => {
      const name = action.payload.variabel?.trim();
      const value = action.payload.value?.trim();
      if (!name || value === undefined || value === null) return;
      const exists = state.customVariable.some((v) => v.variabel === name);
      if (exists) return alert("variable already exists");
      state.customVariable.push({ variabel: name, value });
    },
    setTempVarName: (state, action: PayloadAction<string>) => {
      state.tempVarName = action.payload;
    },
    setTempVarValue: (state, action: PayloadAction<string>) => {
      state.tempVarValue = action.payload;
    },
    clearTempVarInputs: (state) => {
      state.tempVarName = "";
      state.tempVarValue = "";
    },
    insertValue: (
      state,
      action: PayloadAction<{ value: string; pos: number }>
    ) => {
      const { value, pos } = action.payload;
      state.expression =
        state.expression.slice(0, pos) + value + state.expression.slice(pos);
    },
    setExpression: (state, actions: PayloadAction<string>) => {
      state.expression = actions.payload;
    },
    clearFields: (state) => {
      state.expression = "";
      state.result = "";
    },
    deleteAtPos: (state, action: PayloadAction<{ pos: number }>) => {
      const { pos } = action.payload;
      if (pos > 0) {
        state.expression =
          state.expression.slice(0, pos - 1) + state.expression.slice(pos);
      }
    },
    deleteHistory: (state, action: PayloadAction<{ index: number }>) => {
      state.history = state.history.filter((_, i) => {
       return i !== action.payload.index;
      });
    },
    evaluate: (state) => {
      let expr = state.expression.replace(/\^/g, "**");

      expr = expr.replace(/sqrt\(/g, "Math.sqrt(");
      expr = expr.replace(/sin\(/g, "Math.sin(");
      expr = expr.replace(/cos\(/g, "Math.cos(");
      expr = expr.replace(/tan\(/g, "Math.tan(");
      expr = expr.replace(/Pi/g, "Math.PI");
      expr = expr.replace(/e/g, "Math.E");
      // substitute custom variables by identifier
      const reserved = new Set(["Math", "sin", "cos", "tan", "sqrt"]);
      expr = expr.replace(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g, (ident) => {
        if (reserved.has(ident)) return ident;
        const found = state.customVariable.find((v) => v.variabel === ident);
        if (found) {
          return String(Number(found.value));
        }
        return ident;
      });

      try {
        // eslint-disable-next-line no-eval
        const computed = (eval(expr) as unknown as number | string).toString();
        state.result = computed;
        state.history.push({ expression: state.expression, result: computed });
      } catch {
        state.result = "Error";
        state.expression = "";
      }
    },
  },
});

export const {
  insertValue,
  deleteHistory,
  setExpression,
  clearFields,
  deleteAtPos,
  evaluate,
  addCustomVariable,
  setTempVarName,
  setTempVarValue,
  clearTempVarInputs,
} = calcSlice.actions;
export default calcSlice.reducer;
