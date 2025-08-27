import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expression: "",
  result: "",
};

const calcSlice = createSlice({
  initialState,
  name: "calculator",

  reducers: {
    appendValue: (state, actions) => {
      state.expression += actions.payload;
    },
    setExpression: (state, actions) => {
      state.expression = actions.payload;
    },
    clearFields: (state) => {
      state.expression = "";
      state.result = "";
    },
    backSpace: (state) => {
      state.expression = state.expression.slice(0, -1);
    },
    evaluate: (state) => {
      let expr = state.expression.replace(/\^/g, "**");

      expr = expr.replace(/sqrt\(/g, "Math.sqrt(");
      expr = expr.replace(/sin\(/g, "Math.sin(");
      expr = expr.replace(/cos\(/g, "Math.cos(");
      expr = expr.replace(/tan\(/g, "Math.tan(");

      try {
        state.result = eval(expr).toString();
      } catch {
        state.result = "Error";
        state.expression = "";
      }
    },
  },
});

export const { appendValue, setExpression, clearFields, backSpace, evaluate } =
  calcSlice.actions;
export default calcSlice.reducer;
