// main.jsx
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./redux/store/store.js";
import App from "./App.jsx";
import ConfettiWrapper from "./components/ConfettiWrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ConfettiWrapper />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
);
