import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
	Table,
	TableBody,
	TableHead,
	TableCell,
	TableRow,
	Paper,
	Fab,
	Zoom,
	Tooltip
} from "@material-ui/core/";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { Context } from "../App";
import { findAlias } from "../utils";

const styles = theme => ({
	addFab: {
		width: theme.spacing(5),
		height: theme.spacing(5)
	},
	editIcon: {
		marginLeft: theme.spacing(1)
	},
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
	head: {
		backgroundColor: "#fff",
		position: "sticky",
		top: 0
	},
	link: {
		textDecoration: "none",
		color: "inherit"
	}
});

function ProdottiList(props) {
	const { classes } = props;
	const { appState } = useContext(Context);

	const filtered = appState.prodotti.filter(
		row =>
			appState.search === "" ||
			row.nome.toUpperCase().includes(appState.search.toUpperCase()) ||
			findAlias(appState, row.azienda).includes(
				appState.search.toUpperCase()
			) ||
			row.id.toString().includes(appState.search.toUpperCase())
	);

	return (
		<Paper className={classes.container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell className={classes.head}>Nome Prodotto</TableCell>
						<TableCell className={classes.head}>Azienda</TableCell>
						<TableCell className={classes.head}>UDM</TableCell>
						<TableCell className={classes.head}>Prezzo</TableCell>
						<TableCell className={classes.head}>
							<Tooltip TransitionComponent={Zoom} title="Aggiungi Prodotto">
								<Fab
									color={props.add ? "secondary" : "primary"}
									aria-label="Aggiungi Prodotto"
									className={classes.addFab}
									onClick={e =>
										props.setParentState(
											props.add
												? {
														add: false,
														selectedId: ""
												  }
												: {
														add: true,
														selectedId: ""
												  }
										)
									}
								>
									<AddIcon />
								</Fab>
							</Tooltip>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filtered.map(row => (
						<TableRow
							className={classes.row}
							hover
							selected={props.selectedId === row.id}
							key={row.id}
							onClick={e => {
								props.setParentState(
									props.selectedId !== row.id
										? {
												add: false,
												selectedId: row.id
										  }
										: {
												add: false,
												selectedId: ""
										  }
								);
							}}
						>
							<TableCell component="th" scope="row">
								{row.nome}
							</TableCell>
							<TableCell>{findAlias(appState, row.azienda)}</TableCell>
							<TableCell>{row.udm}</TableCell>
							<TableCell>€ {row.prezzo}</TableCell>
							<TableCell>
								<EditIcon className={classes.editIcon} />
							</TableCell>
						</TableRow>
					))}
					{filtered.length === 0 ? (
						<TableRow>
							<TableCell colSpan={5} key="noresult" component="th" scope="row">
								Nessun Risultato Trovato!
							</TableCell>
						</TableRow>
					) : null}
				</TableBody>
			</Table>
		</Paper>
	);
}

export default withStyles(styles, { withTheme: true })(ProdottiList);
