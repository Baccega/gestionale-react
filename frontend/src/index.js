import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const myTheme = createMuiTheme({
	palette: {
		primary: {
			main: "#1B5E20",
			contrastText: "#fff"
		}
	}
	// typography: {
	// 	useNextVariants: true
	// },
	// overrides: {
	// 	MuiListItem: {
	// 		root: {
	// 			"&$selected, &$selected:hover": {
	// 				backgroundColor: "#1B5E20",
	// 				"& *": { color: "#ffffff" }
	// 			}
	// 		}
	// 	}
	// }
});

ReactDOM.render(
	<>
		<CssBaseline />
		<ThemeProvider theme={myTheme}>
			<App />
		</ThemeProvider>
	</>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
