import React, { useContext } from "react";
import { withStyles, Fab, Zoom, Tooltip } from "@material-ui/core";
import {
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Divider
} from "@material-ui/core/";

import AddIcon from "@material-ui/icons/Add";
import { monthNames, findAlias } from "../utils";
import { Context } from "../App";
import { FatturaContext } from "../pages/Fatture";

const styles = theme => ({
	paperContainer: {
		height: "100%"
	},
	addFatturaFab: {
		width: theme.spacing(4.5),
		height: theme.spacing(4.5)
	},
	firstItem: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		cursor: "pointer"
	},
	listItem: {
		cursor: "pointer"
	}
});

function FattureList(props) {
	const { classes } = props;

	const { fatturaState, setFatturaState } = useContext(FatturaContext);

	const { appState } = useContext(Context);

	const filtered = appState.fatture.filter(
		row =>
			appState.search === "" ||
			findAlias(appState, row.azienda)
				.toUpperCase()
				.includes(appState.search.toUpperCase()) ||
			monthNames(row.mese)
				.toUpperCase()
				.includes(appState.search.toUpperCase()) ||
			row.anno.toUpperCase().includes(appState.search.toUpperCase())
	);

	return (
		<Paper className={classes.paperContainer}>
			<List dense={true}>
				<ListItem
					onClick={() =>
						setFatturaState(
							fatturaState.add
								? {
										...fatturaState,
										selectedId: "",
										add: false
								  }
								: {
										...fatturaState,
										selectedId: "",
										add: true
								  }
						)
					}
					className={classes.firstItem}
				>
					<ListItemText primary="Nuova Fattura" />
					<ListItemSecondaryAction>
						<Tooltip TransitionComponent={Zoom} title="Aggiungi Fattura">
							<Fab
								color={fatturaState.add ? "secondary" : "primary"}
								aria-label="Aggiungi Fattura"
								onClick={() =>
									setFatturaState(fatturaState => ({
										...fatturaState,
										selectedId: "",
										add: !fatturaState.add
									}))
								}
								className={classes.addFatturaFab}
							>
								<AddIcon />
							</Fab>
						</Tooltip>
					</ListItemSecondaryAction>
				</ListItem>
				<Divider />
				{filtered.map(row => (
					<ListItem
						className={classes.listItem}
						selected={row.id === fatturaState.selectedId}
						key={row.id}
						onClick={() =>
							setFatturaState(
								fatturaState.selectedId === row.id
									? {
											...fatturaState,
											selectedId: "",
											add: false
									  }
									: {
											...fatturaState,
											selectedId: row.id,
											add: false
									  }
							)
						}
					>
						<ListItemText
							primary={findAlias(appState, row.azienda)}
							secondary={`${monthNames(row.mese)} ${row.anno}`}
						/>
					</ListItem>
				))}
				{filtered.length === 0 ? (
					<ListItem className={classes.listItem}>
						<ListItemText primary="Nessun Risultato Trovato!" />
					</ListItem>
				) : null}
			</List>
		</Paper>
	);
}

export default withStyles(styles, { withTheme: true })(FattureList);
