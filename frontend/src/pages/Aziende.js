import React, { useContext, useState } from "react";
import { withStyles, Fab, Tooltip, Zoom } from "@material-ui/core";
import {
	Table,
	TableBody,
	TableHead,
	TableCell,
	TableRow,
	Paper,
	Grid
} from "@material-ui/core/";
import { Context } from "../App";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DialogAzienda from "../components/Dialogs/DialogAzienda";

const styles = theme => ({
	row: {
		cursor: "pointer"
	},
	addFab: {
		width: theme.spacing(5),
		height: theme.spacing(5)
	},
	editIcon: {
		marginLeft: theme.spacing(1)
	},
	container: {
		height: "87vh",
		paddingBottom: theme.spacing(3)
	},
	paper: {
		height: "87vh",
		overflowY: "auto"
	}
});

function Aziende(props) {
	const { classes } = props;
	const { appState } = useContext(Context);

	const [state, setState] = useState({
		open: false,
		add: false,
		selectedId: ""
	});

	return (
		<Grid container className={classes.container}>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Table>
						<TableHead>
							<TableRow className={classes.row}>
								<TableCell>Alias</TableCell>
								<TableCell>Ragione Sociale</TableCell>
								<TableCell>P. IVA</TableCell>
								<TableCell>N. Giorni</TableCell>
								<TableCell>Indirizzo</TableCell>
								<TableCell>Cittá</TableCell>
								<TableCell>Provincia</TableCell>
								<TableCell>CAP</TableCell>
								<TableCell>
									<Tooltip TransitionComponent={Zoom} title="Aggiungi Azienda">
										<Fab
											color="primary"
											aria-label="Aggiungi Azienda"
											className={classes.addFab}
											onClick={e =>
												setState(previousState => ({
													open: true,
													add: true,
													selectedId: ""
												}))
											}
										>
											<AddIcon />
										</Fab>
									</Tooltip>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{appState.aziende.map(row => {
								return (
									<TableRow
										hover
										onClick={e =>
											setState(previousState => ({
												open: true,
												add: false,
												selectedId: row.id
											}))
										}
										key={row.id}
									>
										<TableCell component="th" scope="row">
											{row.alias}
										</TableCell>
										<TableCell>{row.ragioneSociale}</TableCell>
										<TableCell>{row.piva}</TableCell>
										<TableCell>{row.nGiorni}</TableCell>
										<TableCell>{row.indirizzo}</TableCell>
										<TableCell>{row.citta}</TableCell>
										<TableCell>{row.provincia}</TableCell>
										<TableCell>{row.cap}</TableCell>
										<TableCell>
											<EditIcon className={classes.editIcon} />
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					<DialogAzienda setState={setState} {...state} />
				</Paper>
			</Grid>
		</Grid>
	);
}

export default withStyles(styles, { withTheme: true })(Aziende);
