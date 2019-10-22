import React, { useContext } from "react";
import { withStyles } from "@material-ui/core";
import { Context } from "../App";

const styles = theme => ({});

// const testAPI = async () => {
// 	const res = await fetch("http://0.0.0.0:3500/v1");
// 	const json = await res.json();
// };

function Dashboard(props) {
	// const { classes } = props;

	const { appState } = useContext(Context);

	return <>{appState.search}</>;
}

export default withStyles(styles, { withTheme: true })(Dashboard);
