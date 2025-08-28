import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expression: "",
  result: "",
  history: [],
};

const calcSlice = createSlice({
  initialState,
  name: "calculator",

  reducers: {
    insertValue: (state, action) => {
      const { value, pos } = action.payload;
      state.expression =
        state.expression.slice(0, pos) + value + state.expression.slice(pos);
    },
    setExpression: (state, actions) => {
      state.expression = actions.payload;
    },
    clearFields: (state) => {
      state.expression = "";
      state.result = "";
    },
    deleteAtPos: (state, action) => {
      const { pos } = action.payload;
      if (pos > 0) {
        state.expression =
          state.expression.slice(0, pos - 1) + state.expression.slice(pos);
      }
    },
    evaluate: (state) => {
      let expr = state.expression.replace(/\^/g, "**");

      expr = expr.replace(/sqrt\(/g, "Math.sqrt(");
      expr = expr.replace(/sin\(/g, "Math.sin(");
      expr = expr.replace(/cos\(/g, "Math.cos(");
      expr = expr.replace(/tan\(/g, "Math.tan(");

      try {
        const computed = eval(expr).toString();
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
  setExpression,
  clearFields,
  deleteAtPos,
  evaluate,
} = calcSlice.actions;
export default calcSlice.reducer;
