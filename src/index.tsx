
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { setupStore } from "./redux/store";
import { Provider } from "react-redux";
import "./index.scss";

const store = setupStore();
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);
