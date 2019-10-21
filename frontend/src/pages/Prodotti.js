import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core/";
import ProdottiList from "../components/ProdottiList";
import ProdottiSelected from "../containers/ProdottiSelected";

const styles = theme => ({
	addFab: {
		width: theme.spacing(5),
		height: theme.spacing(5)
	},
	editIcon: {
		marginLeft: theme.spacing(1)
	},
	container: {
		display: "flex",
		flexDirectio: "column",
		height: "87vh"
	},
	head: {
		backgroundColor: "#fff",
		position: "sticky",
		top: 0
	},
	ite: {
		height: "87vh"
	}
});

function Prodotti(props) {
	const { classes } = props;

	const [state, setState] = useState({
		add: false,
		selectedId: ""
	});

	return (
		<Grid container className={classes.container} spacing={1}>
			<Grid className={classes.ite} item xs={7}>
				<ProdottiList {...state} setParentState={setState} />
			</Grid>
			<Grid item className={classes.ite} xs={5}>
				<ProdottiSelected {...state} setParentState={setState} />
			</Grid>
		</Grid>
	);
}

export default withStyles(styles, { withTheme: true })(Prodotti);
