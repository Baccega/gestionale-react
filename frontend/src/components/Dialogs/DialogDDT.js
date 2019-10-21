import React, { useState, useContext, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	Button,
	TextField
} from "@material-ui/core/";
import { FatturaContext } from "../../pages/Fatture";

const styles = theme => ({
	formContainer: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gridColumnGap: "40px",
		gridRowGap: "5px",
		justifyItems: "stretch",
		width: "100%",
		height: "100%"
	},
	textField: {
		width: "100%",
		height: "50px"
	},
	textFieldBig: {
		gridColumn: "1 / span 2",
		height: "50px"
	}
});

function DialogDDT(props) {
	const { classes, selectedId, add, closeDialog } = props;
	const { fatturaState, setFatturaState } = useContext(FatturaContext);

	const [state, setState] = useState({});

	useEffect(() => {
		if (selectedId !== "") {
			setState(previousState =>
				fatturaState.fattura.ddt.find(found => found.id === selectedId)
			);
		} else {
			setState(previousState => ({
				id: Date.now(),
				numero: 0
			}));
		}
	}, [selectedId, fatturaState.fattura.ddt]);

	const submitDDT = e => {
		e.preventDefault();
		setFatturaState(fatturaState => ({
			...fatturaState,
			fattura: {
				...fatturaState.fattura,
				ddt: add
					? [...fatturaState.fattura.ddt, state]
					: fatturaState.fattura.ddt.map(ddt =>
							ddt.id === selectedId ? state : ddt
					  )
			}
		}));
		closeDialog();
	};

	const handleInput = ({ target }) => {
		const { name, value } = target;

		setState(prevState => ({ ...prevState, [name]: value }));
	};

	return (
		<Dialog
			open={selectedId !== "" || add}
			onClose={closeDialog}
			onSubmit={submitDDT}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">
				{add ? "Aggiungi DDT" : "Modifica DDT"}
			</DialogTitle>
			<DialogContent>
				<form id="formDdt" className={classes.formContainer}>
					<TextField
						InputLabelProps={{ shrink: true }}
						margin="normal"
						name="numero"
						label="Numero DDT"
						type="number"
						required
						className={classes.textFieldBig}
						onChange={handleInput}
						value={state.numero}
						inputProps={{
							step: 1
						}}
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog} color="primary">
					Annulla
				</Button>
				<Button onClick={submitDDT} color="primary">
					{add ? "Aggiungi" : "Modifica"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default withStyles(styles, { withTheme: true })(DialogDDT);
