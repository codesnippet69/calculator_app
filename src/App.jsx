import "./App.css";
import Buttons from "./components/button";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Buttons />
      </Provider>
    </>
  );
}

export default App;
