import React, { useReducer, useEffect, createContext } from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core";

import Dashboard from "./pages/Dashboard";
import Fatture from "./pages/Fatture";
import Prodotti from "./pages/Prodotti";
import Aziende from "./pages/Aziende";
import MyDrawer from "./containers/MyDrawer";
import { appReducer, initialState } from "./Reducer";
import { useFetch } from "./utils";

const styles = theme => ({
	appRoot: {
		display: "flex",
		height: "100%"
	},
	"@global": {
		"html, body, #root": {
			height: "100%"
		}
	},
	fullWidth: {
		height: "100%"
	}
});

export const Context = createContext();

function App(props) {
	const { classes } = props;

	const [state, dispatch] = useReducer(appReducer, initialState);

	useEffect(() => {
		console.log("App state changed");
	}, [state]);

	useFetch(() => "sdf");

	// const testAPI = async () => {
	// 	const res = await fetch("http://0.0.0.0:3500/v1");
	// 	const json = await res.json();
	// };

	return (
		<div className={classes.appRoot}>
			<Context.Provider value={{ appState: state, dispatch: dispatch }}>
				<BrowserRouter>
					<MyDrawer>
						<Switch>
							<Redirect exact from="/" to="/dashboard" />
							<Route path="/dashboard">
								<Dashboard className={classes.fullWidth} />
							</Route>
							<Route path="/fatture">
								<Fatture className={classes.fullWidth} />
							</Route>
							<Route path="/prodotti">
								<Prodotti className={classes.fullWidth} />
							</Route>
							<Route path="/aziende">
								<Aziende className={classes.fullWidth} />
							</Route>
						</Switch>
					</MyDrawer>
				</BrowserRouter>
			</Context.Provider>
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(App);
