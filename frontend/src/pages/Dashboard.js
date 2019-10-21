import React, { useContext } from "react";
import { withStyles } from "@material-ui/core";
import { Context } from "../App";

const styles = theme => ({});

function Dashboard(props) {
	// const { classes } = props;

	const { appState } = useContext(Context);

	return <>{appState.udm[0]}</>;
}

export default withStyles(styles, { withTheme: true })(Dashboard);
