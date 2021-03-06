import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// NEEDED TO GET MATERIAL UI ICONS LIKE BUTTONS TO BE THE CORRECT COLOR
// #faaf00
const theme = createTheme({
    palette: {
        primary: {
            main: "#f2c73b",
            contrastText: "#000000",
        },
        secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
        },
        gray: {
            main: "#e9e9e9",
            light: "#e9e9e9",
            dark: "#e9e9e9",
            contrastText: "#000"
        }
    },
});
ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                {
                    window.innerWidth > 786 && window.innerHeight > 414 ? <App /> : 
                    <div className="mobileProblem">
                        <h1>Sorry, this site is not optimized for small devices.</h1>
                        <br />
                        <p>Please access this web app on a larger device</p>
                        <p>(Such as a laptop or tablet)</p>
                    </div>
                }
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();