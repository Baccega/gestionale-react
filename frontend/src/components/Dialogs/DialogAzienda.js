import React, { useState, useContext, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	Button,
	TextField,
	InputAdornment,
	MenuItem
} from "@material-ui/core/";
import { Context } from "../../App";

const styles = theme => ({
	formContainer: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr 1fr",
		gridColumnGap: "30px",
		gridRowGap: "5px",
		justifyItems: "stretch",
		width: "100%",
		height: "100%"
	},
	textFieldSmall: {
		width: "100%",
		height: "50px"
	},
	textField: {
		gridColumn: "1 / span 2",
		width: "100%",
		height: "50px"
	},
	textFieldRight: {
		gridColumn: "3 / span 2",
		width: "100%",
		height: "50px"
	},
	textFieldBig: {
		gridColumn: "1 / span 4",
		height: "50px",
		width: "100%"
	}
});

function DialogAzienda(props) {
	const { classes } = props;

	const [state, setState] = useState({});
	const { appState, dispatch } = useContext(Context);

	useEffect(() => {
		if (props.selectedId !== "") {
			setState(appState.aziende.find(found => found.id === props.selectedId));
		} else {
			setState(previousState => ({
				id: "",
				alias: "",
				ragioneSociale: "",
				piva: "",
				indirizzo: "",
				citta: "",
				provincia: "",
				cap: "",
				nGiorni: 0,
				codiceFiscale: "",
				nome: "",
				cognome: "",
				sdi: "",
				pagamento: "",
				iva: 22
			}));
		}
	}, [props.selectedId, appState.aziende]);

	const closeDialog = e => {
		props.setState(previousState => ({
			open: false,
			add: false,
			selectedId: ""
		}));
	};

	const addAzienda = e => {
		e.preventDefault();
		dispatch({ type: "azienda-add", payload: state });
		closeDialog();
	};

	const updateAzienda = e => {
		e.preventDefault();
		dispatch({
			type: "azienda-update",
			payload: state,
			selectedId: props.selectedId
		});
		closeDialog();
	};

	const handleInput = ({ target }) => {
		const { name, value } = target;

		setState(prevState => ({ ...prevState, [name]: value }));
	};

	return (
		<Dialog
			open={props.open}
			onClose={closeDialog}
			aria-labelledby="form-dialog-title"
			onSubmit={e => (props.add ? addAzienda(e) : updateAzienda(e))}
		>
			<DialogTitle id="form-dialog-title">
				{props.add ? "Aggiungi Azienda" : "Modifica Azienda"}
			</DialogTitle>
			<DialogContent>
				<form id="myform" className={classes.formContainer}>
					<TextField
						InputLabelProps={{ shrink: true }}
						margin="normal"
						name="ragioneSociale"
						label="Ragione Sociale"
						type="text"
						required
						className={classes.textFieldBig}
						value={state.ragioneSociale}
						onChange={handleInput}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						autoFocus
						margin="normal"
						name="alias"
						label="Alias Azienda"
						type="text"
						required
						className={classes.textFieldSmall}
						value={state.alias}
						onChange={handleInput}
					/>

					<TextField
						InputLabelProps={{ shrink: true }}
						margin="normal"
						name="piva"
						label="P. IVA"
						type="text"
						required
						className={classes.textFieldSmall}
						onChange={handleInput}
						value={state.piva}
					/>

					<TextField
						InputLabelProps={{ shrink: true }}
						margin="normal"
						name="iva"
						label="IVA %"
						type="number"
						required
						className={classes.textFieldSmall}
						onChange={handleInput}
						value={state.iva}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						margin="normal"
						name="nGiorni"
						label="N. Giorni"
						type="number"
						inputProps={{
							step: 30
						}}
						required
						className={classes.textFieldSmall}
						onChange={handleInput}
						value={state.nGiorni}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">Giorni</InputAdornment>
							)
						}}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						margin="normal"
						name="sdi"
						label="SDI"
						type="text"
						className={classes.textFieldSmall}
						onChange={handleInput}
						value={state.sdi}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						autoFocus
						margin="normal"
						name="codiceFiscale"
						label="Codice Fiscale"
						type="text"
						className={classes.textFieldSmall}
						value={state.codiceFiscale}
						onChange={handleInput}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						autoFocus
						margin="normal"
						name="nome"
						label="Nome"
						type="text"
						className={classes.textFieldSmall}
						value={state.nome}
						onChange={handleInput}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						autoFocus
						margin="normal"
						name="cognome"
						label="Cognome"
						type="text"
						className={classes.textFieldSmall}
						value={state.cognome}
						onChange={handleInput}
					/>

					<TextField
						InputLabelProps={{ shrink: true }}
						margin="normal"
						name="indirizzo"
						label="Indirizzo"
						type="text"
						className={classes.textField}
						onChange={handleInput}
						value={state.indirizzo}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						margin="normal"
						name="citta"
						label="Cittá"
						type="text"
						className={classes.textFieldRight}
						onChange={handleInput}
						value={state.citta}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						margin="normal"
						name="provincia"
						label="Provincia"
						type="text"
						className={classes.textFieldSmall}
						onChange={handleInput}
						value={state.provincia}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						margin="normal"
						name="cap"
						label="CAP"
						type="text"
						className={classes.textFieldSmall}
						onChange={handleInput}
						value={state.cap}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						select
						margin="normal"
						name="pagamento"
						label="Modalità Pagamento"
						type="text"
						className={classes.textFieldRight}
						onChange={handleInput}
						value={state.pagamento}
					>
						{appState.pagamenti.map((row, index) => {
							return (
								<MenuItem key={`modalita-pagamento-${index}`} value={row}>
									{row}
								</MenuItem>
							);
						})}
					</TextField>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog} color="primary">
					Annulla
				</Button>
				<Button type="submit" form="myform" color="primary">
					{props.add ? "Aggiungi" : "Modifica"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default withStyles(styles, { withTheme: true })(DialogAzienda);
