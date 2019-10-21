import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
	TextField,
	InputAdornment,
	Select,
	MenuItem,
	FormControl,
	InputLabel
} from "@material-ui/core/";
import { Context } from "../App";

const styles = theme => ({
	textFieldSmall: {
		width: "30%"
	},
	textField: {
		width: "50%"
	},
	select: {
		width: "30%",
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	textFieldBig: {
		width: "100%"
	}
});

function ProdottiFormBody(props) {
	const { classes, parentState, setParentState } = props;

	const { appState } = useContext(Context);

	function setField(fieldname, value) {
		setParentState({ ...parentState, [fieldname]: value });
	}

	return (
		<>
			<TextField
				InputLabelProps={{ shrink: true }}
				autoFocus
				margin="normal"
				id="nome"
				label="Nome Prodotto"
				type="text"
				required
				className={classes.textFieldBig}
				value={parentState.nome}
				onChange={e => setField("nome", e.target.value)}
			/>

			<FormControl required className={classes.select}>
				<InputLabel shrink htmlFor="udm">
					UDM
				</InputLabel>
				<Select
					value={parentState.udm}
					onChange={e => setField("udm", e.target.value)}
					inputProps={{
						id: "udm"
					}}
				>
					{appState.udm.map(row => {
						return (
							<MenuItem key={row} value={row}>
								{row}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>

			<FormControl required className={classes.select}>
				<InputLabel shrink htmlFor="azienda">
					Azienda
				</InputLabel>
				<Select
					value={
						parentState.azienda !== ""
							? parentState.azienda
							: appState.aziende[0].id
					}
					onChange={e => setField("azienda", e.target.value)}
					required
					inputProps={{
						id: "azienda"
					}}
				>
					{appState.aziende.map(row => {
						return (
							<MenuItem key={row.id} value={row.id}>
								{row.alias}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<TextField
				InputLabelProps={{ shrink: true }}
				margin="normal"
				id="prezzo"
				label="Prezzo"
				type="number"
				required
				className={classes.textFieldSmall}
				onChange={e => setField("prezzo", e.target.value)}
				value={parentState.prezzo}
				inputProps={{
					step: 0.0001
				}}
				InputProps={{
					startAdornment: <InputAdornment position="start">€</InputAdornment>
				}}
			/>
		</>
	);
}

export default withStyles(styles, { withTheme: true })(ProdottiFormBody);
