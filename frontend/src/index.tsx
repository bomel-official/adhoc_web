import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import { App, initKeycloak } from "./core";

initKeycloak().then( () => {
    const root = ReactDOM.createRoot(
        document.getElementById( "root" ) as HTMLElement
    );
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
} );
