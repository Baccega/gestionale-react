import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Context } from "../App";
import { FatturaContext } from "../pages/Fatture";
import {
	Table,
	TableBody,
	TableHead,
	TableCell,
	TableRow,
	Fab,
	Zoom,
	Tooltip
} from "@material-ui/core/";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DialogFatture from "./Dialogs/DialogFatture";

const styles = theme => ({
	container: {
		overflowY: "auto",
		overflowX: "hidden",
		height: "100%",
		width: "100%"
	},
	header: {
		width: "100%"
	},
	row: {
		"&:hover": {
			cursor: "pointer"
		}
	},
	cell: {
		textAlign: "center"
	},
	head: {
		backgroundColor: "#fff",
		position: "sticky",
		top: 0,
		textAlign: "center"
	},
	link: {
		textDecoration: "none",
		color: "inherit"
	}
});

function FattureDettagli(props) {
	const { classes } = props;
	const { fatturaState } = useContext(FatturaContext);
	const { appState } = useContext(Context);
	const searchState = useState(null);

	const [state, setState] = useState({
		add: false,
		selectedId: ""
	});

	const closeDialog = () => {
		searchState[1](null);
		setState(previousState => ({
			add: false,
			selectedId: ""
		}));
	};

	const filtered = fatturaState.fattura.dettagli.filter(
		dettaglio =>
			appState.search === "" ||
			dettaglio.descrizione
				.toUpperCase()
				.includes(appState.search.toUpperCase())
	);

	return (
		<div className={classes.container}>
			<DialogFatture
				{...state}
				searchState={searchState}
				closeDialog={closeDialog}
			/>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell className={classes.head}>Nome Prodotto</TableCell>
						<TableCell className={classes.head}>Colore</TableCell>
						<TableCell className={classes.head}>UDM</TableCell>
						<TableCell className={classes.head}>Prezzo</TableCell>
						<TableCell className={classes.head}>Quantit&agrave;</TableCell>
						<TableCell className={classes.head}>Totale</TableCell>
						<TableCell className={classes.head}>
							<Tooltip TransitionComponent={Zoom} title="Aggiungi Dettaglio">
								<Fab
									color={props.add ? "secondary" : "primary"}
									aria-label="Aggiungi Dettaglio"
									className={classes.addFab}
									onClick={e => {
										setState(previousState => ({ selectedId: "", add: true }));
									}}
								>
									<AddIcon />
								</Fab>
							</Tooltip>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filtered.map(dettaglio => (
						<TableRow
							className={classes.row}
							hover
							key={dettaglio.id}
							onClick={e => {
								setState(previousState => ({
									selectedId: dettaglio.id,
									add: false
								}));
							}}
						>
							<TableCell className={classes.cell} component="th" scope="row">
								{dettaglio.descrizione}
							</TableCell>
							<TableCell className={classes.cell}>{dettaglio.colore}</TableCell>
							<TableCell className={classes.cell}>{dettaglio.udm}</TableCell>
							<TableCell className={classes.cell}>
								€ {dettaglio.prezzo}
							</TableCell>
							<TableCell className={classes.cell}>
								{dettaglio.quantita}
							</TableCell>
							<TableCell className={classes.cell}>
								€ {(dettaglio.quantita * dettaglio.prezzo).toFixed(2)}
							</TableCell>
							<TableCell className={classes.cell}>
								<EditIcon className={classes.editIcon} />
							</TableCell>
						</TableRow>
					))}
					{filtered.length === 0 ? (
						<TableRow key="no-result-dettagli">
							<TableCell
								className={classes.cell}
								colSpan={7}
								key="noresult"
								component="th"
								scope="row"
							>
								Nessun Risultato Trovato!
							</TableCell>
						</TableRow>
					) : null}
				</TableBody>
			</Table>
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(FattureDettagli);
