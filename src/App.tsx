import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;
