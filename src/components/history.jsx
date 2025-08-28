import { useSelector, useDispatch } from "react-redux";
import { setExpression } from "../redux/slices/slices";

function History() {
  const history = useSelector((state) => state.calculator.history);
  const dispatch = useDispatch();

  return (
    <div className="history w-full max-w-md h-54 rounded-xl border mt-5 border-neutral-800 bg-neutral-900/60 p-4 text-neutral-100">
      <h3 className="text-lg font-semibold mb-3">History</h3>
      {history.length === 0 && (
        <p className="text-neutral-400 text-sm">No history yet</p>
      )}
      <ul className="space-y-2 max-h-[60vh] overflow-auto pr-1">
        {history.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded-lg border border-neutral-800/60 bg-neutral-800/40 hover:bg-neutral-800/60 transition p-2"
          >
            <span
              className="history-expression cursor-pointer text-left text-sm text-neutral-200 hover:text-white"
              onClick={() => dispatch(setExpression(item.expression))}
            >
              {item.expression} = {item.result}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
