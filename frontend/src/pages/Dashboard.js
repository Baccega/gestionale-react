import React, { useContext } from "react";
import { withStyles } from "@material-ui/core";
import { Context } from "../App";

const styles = theme => ({});

const testAPI = async () => {
	const res = await fetch("http://0.0.0.0:3500/v1");
	console.log(res);
	const json = await res.json();
	console.log(json);
};

function Dashboard(props) {
	// const { classes } = props;

	const { appState } = useContext(Context);

	testAPI();

	return <>{appState.udm[0]}</>;
}

export default withStyles(styles, { withTheme: true })(Dashboard);
