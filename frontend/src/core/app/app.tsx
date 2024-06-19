import { GlobalStyles } from "@mui/material";
import {
    Experimental_CssVarsProvider as CssVarsProvider,
    experimental_extendTheme as extendTheme,
} from "@mui/material/styles";
import React, { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { PageRouter } from "../../routes";

const theme = extendTheme( {
    cssVarPrefix: "adhoc",
} );

export const App: FC = () => {
    return (
        <div className="App">
            <CssVarsProvider theme={ theme }>
                <GlobalStyles styles={ {
                    "*": {
                        boxSizing: "border-box"
                    },
                    "html, body, #root, .App": {
                        height: "100%"
                    }
                } }/>
                <Router>
                    <PageRouter/>
                </Router>
            </CssVarsProvider>
        </div>
    );
};
