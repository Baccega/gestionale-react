import React, { useState, useContext, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
	Typography,
	TextField,
	InputAdornment,
	Button,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Fab,
	Tooltip,
	Zoom,
	MenuItem
} from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Context } from "../App";

const styles = theme => ({
	addVersioniFab: {
		width: theme.spacing(4.5),
		height: theme.spacing(4.5),
		marginLeft: theme.spacing(1.7)
	},
	addVersioneForm: {
		height: theme.spacing(1)
	},
	versioniField: {
		width: "70%",
		minWidth: theme.spacing(10)
	},
	versioniContainer: {
		overflowY: "auto",
		width: "100%",
		height: "50%"
	},
	versioniTable: {
		height: "100%"
	}
});

function ProdottiFormVersioni(props) {
	const { classes, parentState, setParentState } = props;

	const { appState } = useContext(Context);

	const [state, setState] = useState({
		id: Date.now(),
		descrizione: "",
		prezzo: "",
		udm: parentState.udm
	});

	useEffect(() => {
		setState(prev => ({ ...prev, udm: parentState.udm }));
	}, [parentState.udm]);

	const handleInput = ({ target }) => {
		const { name, value } = target;

		setState(prevState => ({ ...prevState, [name]: value.toUpperCase() }));
	};

	return (
		<div className={classes.versioniContainer}>
			<Typography variant="h6" color="inherit">
				Versioni Prodotto
			</Typography>
			<div id="versioniForm">
				<Table className={classes.versioniTable} padding="none">
					<TableHead>
						<TableRow>
							<TableCell>
								<TextField
									InputLabelProps={{ shrink: true }}
									margin="normal"
									name="descrizione"
									label="Descrizione"
									type="text"
									className={classes.versioniField}
									value={state.descrizione}
									onChange={handleInput}
								/>
							</TableCell>
							<TableCell>
								<TextField
									InputLabelProps={{ shrink: true }}
									margin="normal"
									name="prezzo"
									label="Prezzo"
									type="number"
									className={classes.versioniField}
									value={state.prezzo}
									onChange={handleInput}
									inputProps={{
										step: 0.0001
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">€</InputAdornment>
										)
									}}
								/>
							</TableCell>
							<TableCell>
								<TextField
									InputLabelProps={{ shrink: true }}
									margin="normal"
									name="udm"
									select
									label="Udm"
									className={classes.versioniField}
									value={state.udm}
									onChange={handleInput}
								>
									{appState.udm.map(udm => {
										return (
											<MenuItem key={`udm-${udm}`} value={udm}>
												{udm}
											</MenuItem>
										);
									})}
								</TextField>
							</TableCell>
							<TableCell>
								<Tooltip TransitionComponent={Zoom} title="Aggiungi Versione">
									<Fab
										color="primary"
										aria-label="Aggiungi Versione"
										className={classes.addVersioniFab}
										onClick={e => {
											props.setParentState(previousState => ({
												...previousState,
												versioni: [
													...previousState.versioni,
													{
														...state,
														udm:
															previousState.udm === state.udm ? "" : state.udm
													}
												]
											}));
											setState(previousState => ({
												id: Date.now(),
												descrizione: "",
												prezzo: "",
												udm: parentState.udm
											}));
										}}
									>
										<AddIcon />
									</Fab>
								</Tooltip>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{parentState.versioni.map(versione => {
							return (
								<TableRow key={versione.id}>
									<TableCell>{versione.descrizione}</TableCell>
									<TableCell>
										{versione.prezzo !== ""
											? `€ ${versione.prezzo}`
											: "Invariato"}
									</TableCell>
									<TableCell>
										{versione.udm !== "" ? versione.udm : "Invariato"}
									</TableCell>
									<TableCell>
										<Button
											className={classes.deleteIcon}
											onClick={e =>
												setParentState(previousState => ({
													...previousState,
													versioni: previousState.versioni.filter(
														versioneTrovata =>
															versioneTrovata.id !== versione.id
													)
												}))
											}
										>
											<DeleteIcon />
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(ProdottiFormVersioni);
