import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	InputAdornment
} from "@material-ui/core/";
import { Context } from "../App";
import { months } from "../utils";
import { FatturaContext } from "../pages/Fatture";
import FattureActionButtons from "../components/FattureActionButtons";
import FattureDDT from "../components/FattureDDT";

const styles = theme => ({
	formFattura: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between"
	},
	select: {
		width: "30%",
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	row: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between"
	},
	textFieldSmall: {
		width: "20%"
	},
	ddtContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingBottom: theme.spacing(2.5)
	},
	addDdtFab: {
		marginLeft: theme.spacing(3),
		width: theme.spacing(4.5),
		height: theme.spacing(4.5)
	},
	ddtButton: {
		width: theme.spacing(5),
		height: theme.spacing(5)
	}
});

function FattureInfo(props) {
	const { classes } = props;
	const { appState, dispatch } = useContext(Context);
	const { fatturaState, setFatturaState } = useContext(FatturaContext);

	const changeFattura = (field, value) => {
		setFatturaState(previousState => ({
			...previousState,
			[field]: value
		}));
	};

	return (
		<form
			id="fatturaForm"
			className={classes.formFattura}
			onSubmit={e => {
				e.preventDefault();
				if (!fatturaState.ddtDialogOpen) {
					setFatturaState(fatturaState => ({
						...fatturaState,
						add: false,
						selectedId: ""
					}));
					if (fatturaState.add) {
						dispatch({
							type: "fattura-add",
							payload: fatturaState.fattura
						});
					} else {
						dispatch({
							type: "fattura-update",
							payload: fatturaState.fattura,
							selectedId: fatturaState.selectedId
						});
					}
				}
			}}
		>
			<div className={classes.infoContainer}>
				<div className={classes.row}>
					<TextField
						InputLabelProps={{ shrink: true }}
						autoFocus
						margin="normal"
						id="numero"
						label="N. Fattura"
						type="number"
						required
						className={classes.textFieldBig}
						value={fatturaState.fattura.numero}
						onChange={e => changeFattura("numero", e.target.value)}
					/>

					<FormControl required className={classes.select}>
						<InputLabel shrink htmlFor="azienda">
							Mese
						</InputLabel>
						<Select
							value={fatturaState.fattura.mese}
							onChange={e => changeFattura("mese", e.target.value)}
							required
							inputProps={{
								id: "mese"
							}}
						>
							{months.map((row, index) => {
								return (
									<MenuItem
										key={`mese-${index + 1}`}
										value={(index + 1).toString()}
									>
										{row}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>

					<TextField
						InputLabelProps={{ shrink: true }}
						autoFocus
						margin="normal"
						id="anno"
						label="Anno"
						type="number"
						required
						className={classes.textFieldSmall}
						value={fatturaState.fattura.anno}
						onChange={e => changeFattura("anno", e.target.value)}
					/>
				</div>
				<div className={classes.row}>
					<FormControl required className={classes.select}>
						<InputLabel shrink htmlFor="azienda">
							Azienda
						</InputLabel>
						<Select
							value={fatturaState.fattura.azienda}
							onChange={e => changeFattura("azienda", e.target.value)}
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
						autoFocus
						margin="normal"
						id="totale"
						label="Totale Fattura"
						type="number"
						disabled
						className={classes.textFieldSmall}
						value={fatturaState.totaleFattura.toFixed(2)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">€</InputAdornment>
							)
						}}
					/>
				</div>
			</div>
			{/* DDT */}
			<FattureDDT />
			{/* ACTION BUTTONS */}
			<FattureActionButtons />
		</form>
	);
}

export default withStyles(styles, { withTheme: true })(FattureInfo);
