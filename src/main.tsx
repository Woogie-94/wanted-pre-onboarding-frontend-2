import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import GlobalStyle from "./globalStyle.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <GlobalStyle />
  </>,
);
