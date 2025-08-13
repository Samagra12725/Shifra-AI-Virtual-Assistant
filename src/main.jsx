import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ContextUser from "./context/ContextUser.jsx";

createRoot(document.getElementById("root")).render(
   <ContextUser>
    <App />
    </ContextUser>

);
