import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
	<Router>
		<App />
	</Router>
);

reportWebVitals();
