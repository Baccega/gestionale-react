import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, Fab, Tooltip, Zoom } from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";
import { FatturaContext } from "../pages/Fatture";
import DialogDDT from "./Dialogs/DialogDDT";

const styles = theme => ({
	ddtContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingBottom: theme.spacing(5)
	},
	addDdtFab: {
		marginLeft: theme.spacing(3),
		width: theme.spacing(4.5),
		height: theme.spacing(4.5)
	},
	ddtButton: {
		width: theme.spacing(5),
		height: theme.spacing(5),
		marginRight: theme.spacing(3)
	}
});

function FattureDDT(props) {
	const { classes } = props;
	const { fatturaState, setFatturaState } = useContext(FatturaContext);

	const initialState = {
		add: false,
		selectedId: ""
	};

	const [state, setState] = useState(initialState);
	// const { appState, dispatch } = useContext(Context);
	// const { fatturaState, setFatturaState } = useContext(FatturaContext);

	const closeDialog = () => {
		setFatturaState(fatturaState => ({
			...fatturaState,
			ddtDialogOpen: false
		}));
		setState(initialState);
	};

	const openDialog = newState => {
		setFatturaState(fatturaState => ({ ...fatturaState, ddtDialogOpen: true }));
		setState(newState);
	};

	return (
		<div>
			<div className={classes.ddtContainer}>
				<Typography variant="h5">DDT</Typography>
				<Tooltip TransitionComponent={Zoom} title="Aggiungi DDT">
					<Fab
						color="primary"
						aria-label="Aggiungi DDT"
						onClick={() => openDialog({ selectedId: "", add: true })}
						className={classes.addDdtFab}
					>
						<AddIcon />
					</Fab>
				</Tooltip>
			</div>
			<div className={classes.ddtContainer}>
				{fatturaState.fattura.ddt.map(row => (
					<Button
						color="primary"
						key={row.id}
						variant="contained"
						onClick={() => openDialog({ selectedId: row.id, add: false })}
						className={classes.ddtButton}
					>
						{row.numero}
					</Button>
				))}
			</div>
			<DialogDDT {...state} closeDialog={closeDialog} />
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(FattureDDT);
