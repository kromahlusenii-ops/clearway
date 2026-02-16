import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Accounts from "./Accounts";

function Router() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (route === "#accounts" || route === "#/accounts") {
    return <Accounts />;
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
