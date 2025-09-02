import { useSelector, useDispatch } from "react-redux";
import { setExpression, deleteHistory } from "../redux/slices/slices";
import type { RootState } from "../redux/store";

function History() {
  const history = useSelector((state: RootState) => state.calculator.history);
  const dispatch = useDispatch();

  return (
    <div className="history w-full max-w-md mt-5 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 text-slate-900 shadow-xl">
      <h3 className="text-lg font-semibold mb-3 text-slate-700">History</h3>
      {history.length === 0 && (
        <p className="text-slate-400 text-sm">No history yet</p>
      )}
      <ul className="space-y-2.5 max-h-[60vh] overflow-auto pr-1">
        {history.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition p-2.5"
          >
            <button
              className="history-expression text-left text-sm text-slate-700 hover:text-slate-900 truncate"
              onClick={() => dispatch(setExpression(item.expression))}
            >
              {item.expression} = {item.result}
            </button>
            <button
              className="ml-3 text-xs px-2 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
              onClick={() => dispatch(deleteHistory({ index }))}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
