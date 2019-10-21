import React, { useContext, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	Button,
	MenuItem,
	TextField,
	InputAdornment
} from "@material-ui/core/";
import { FatturaContext } from "../../pages/Fatture";
import { Context } from "../../App";
import Autosearch from "../Autosearch";

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
		height: 50
	},
	textFieldBig: {
		gridColumn: "1 / span 2",
		height: "50px"
	}
});

function DialogFatture(props) {
	const { classes, selectedId, add, searchState, closeDialog } = props;
	const { fatturaState, setFatturaState } = useContext(FatturaContext);

	const { appState } = useContext(Context);

	const [state, setState] = useState({});

	const searchableListaProdotti = appState.prodotti
		.filter(prodotto => prodotto.azienda === fatturaState.fattura.azienda)
		.map(prodotto => ({
			label: prodotto.nome,
			value: prodotto.nome,
			id: prodotto.id
		}));

	const setProdotto = prodottoScelto => {
		const prodotto = appState.prodotti.find(
			prodotto => prodotto.id === prodottoScelto.id
		);
		setState(prevDettaglio => ({
			...prevDettaglio,
			prezzo: prodotto.prezzo,
			descrizione: prodotto.nome,
			udm: prodotto.udm,
			versioni: prodotto.versioni
		}));
	};

	const handleInput = ({ target }) => {
		const { name, value } = target;

		setState(prevState => ({ ...prevState, [name]: value.toUpperCase() }));
	};

	const handleChangeVersione = ({ target }) => {
		const { value } = target;
		if (value !== "/") {
			setState(prevState => ({
				...prevState,
				descrizione:
					prevState.descrizione + ` [${value.descrizione.toUpperCase()}]`,
				prezzo: value.prezzo === "" ? prevState.prezzo : value.prezzo,
				udm: value.udm === "" ? prevState.udm : value.udm
			}));
		}
	};

	// useEffectOnce(() => {
	// 	searchState[1](() => null);
	// });

	useEffect(() => {
		// searchState[1](() => null);
		if (selectedId !== "") {
			setState(() =>
				fatturaState.fattura.dettagli.find(found => found.id === selectedId)
			);
		} else {
			setState(() => ({
				id: 0,
				descrizione: "",
				prezzo: 0,
				udm: appState.udm[0],
				quantita: 0,
				colore: appState.colori[0]
			}));
		}
	}, [
		// searchState,
		selectedId,
		fatturaState.fattura.dettagli,
		appState.udm,
		appState.colori
	]);

	return (
		<Dialog
			open={selectedId !== "" || add}
			onClose={closeDialog}
			aria-labelledby="form-dialog-title"
			onSubmit={e => {
				e.preventDefault();

				setFatturaState(fatturaState => ({
					...fatturaState,
					fattura: {
						...fatturaState.fattura,
						dettagli: add
							? [...fatturaState.fattura.dettagli, state]
							: fatturaState.fattura.dettagli.map(dettaglio =>
									dettaglio.id === selectedId ? state : dettaglio
							  )
					}
				}));

				closeDialog();
			}}
		>
			<DialogTitle id="form-dialog-title">
				{add ? "Aggiungi Dettaglio" : "Modifica Dettaglio"}
			</DialogTitle>
			<DialogContent>
				<form id="formFatture" className={classes.formContainer}>
					<Autosearch
						valueSetter={prodottoScelto => setProdotto(prodottoScelto)}
						suggestions={searchableListaProdotti}
						searchState={searchState}
						className={classes.textField}
					/>
					<TextField
						select
						margin="normal"
						InputLabelProps={{ shrink: true }}
						value="/"
						disabled={!state.versioni}
						label="Seleziona Versione"
						className={classes.textField}
						onChange={handleChangeVersione}
						inputProps={{
							name: "versione"
						}}
					>
						{!state.versioni ? (
							<MenuItem key={`versione-vuota`} value={"/"}>
								Cerca un Prodotto
							</MenuItem>
						) : (
							state.versioni
								.map(row => {
									return (
										<MenuItem key={`versione-${row.id}`} value={row}>
											{row.descrizione}
											{row.prezzo !== "" ? ` [$ ${row.prezzo}]` : ""}
										</MenuItem>
									);
								})
								.concat(
									<MenuItem key={`versione-vuota2`} value={"/"}>
										Seleziona una Versione
									</MenuItem>
								)
								.reverse()
						)}
					</TextField>
					<TextField
						InputLabelProps={{ shrink: true }}
						autoFocus
						margin="normal"
						name="descrizione"
						label="Descrizione"
						type="text"
						required
						className={classes.textFieldBig}
						value={state.descrizione}
						onChange={handleInput}
					/>
					<TextField
						InputLabelProps={{ shrink: true }}
						margin="normal"
						name="quantita"
						label="Quantita"
						type="number"
						required
						className={classes.textField}
						onChange={handleInput}
						value={state.quantita}
						inputProps={{
							step: 1
						}}
					/>
					<TextField
						select
						margin="normal"
						InputLabelProps={{ shrink: true }}
						value={state.colore}
						onChange={handleInput}
						label="Colore"
						className={classes.textField}
						name="colore"
						id="colore"
						inputProps={{
							name: "colore",
							id: "colore"
						}}
					>
						{appState.colori.map(row => {
							return (
								<MenuItem key={`colore-${row}`} value={row}>
									{row}
								</MenuItem>
							);
						})}
					</TextField>
					<TextField
						select
						margin="normal"
						InputLabelProps={{ shrink: true }}
						value={state.udm}
						label="Unit&agrave; di Misura"
						className={classes.textField}
						onChange={handleInput}
						inputProps={{
							name: "udm"
						}}
					>
						{appState.udm.map(row => {
							return (
								<MenuItem key={`udm-${row}`} value={row}>
									{row}
								</MenuItem>
							);
						})}
					</TextField>

					<TextField
						InputLabelProps={{ shrink: true }}
						margin="normal"
						name="prezzo"
						label="Prezzo"
						type="number"
						required
						className={classes.textField}
						onChange={handleInput}
						value={state.prezzo}
						inputProps={{
							step: 0.0001,
							name: "prezzo"
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">€</InputAdornment>
							)
						}}
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog} color="primary">
					Annulla
				</Button>
				<Button type="submit" form="formFatture" color="primary">
					{add ? "Aggiungi" : "Modifica"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default withStyles(styles, { withTheme: true })(DialogFatture);
