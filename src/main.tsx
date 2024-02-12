import "@pixi/events";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import gsap from "gsap";
import App from "./App";

gsap.defaults({
  duration: 0.03,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
