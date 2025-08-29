import "./App.css";
import Buttons from "./components/button";
import History from "./components/history";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 flex items-start justify-center p-6">
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex justify-center">
            <Buttons />
          </div>
          <div className="w-full md:w-[320px] lg:w-[360px]">
            <History />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
