import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "fomantic-ui-css/semantic.min.css";
import "./index.css";
import { ContactContextProvider } from "./context/contact-context";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ContactContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContactContextProvider>
);
