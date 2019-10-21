import React, { useState, createContext, useContext, useEffect } from "react";
import { withStyles } from "@material-ui/core";

import { Grid } from "@material-ui/core/";
import FattureList from "../components/FattureList";
import FattureSelected from "../containers/FattureSelected";
import { Context } from "../App";

const styles = theme => ({
	gridContainer: {
		display: "flex",
		flexDirectio: "column",
		height: "87vh"
	},
	gridItem: {
		height: "87vh"
	}
});

export const FatturaContext = createContext();

const calcolaTotale = ({ dettagli }) => {
	return dettagli.reduce(
		(acc, current) => acc + current.prezzo_unitario * current.quantita,
		0
	);
};

function Fatture(props) {
	const { classes } = props;

	const { appState } = useContext(Context);

	const [state, setState] = useState({
		selectedId: "",
		add: false,
		tabIndex: 0,
		totaleFattura: 0,
		ddtDialogOpen: false, // Serve per i form innestati... lo so che fa schifo
		fattura: {
			id: Date.now(),
			azienda: appState.aziende[0].id,
			numero: "",
			mese: "",
			anno: "",
			dettagli: [],
			ddt: []
		}
	});

	useEffect(() => {
		if (state.selectedId !== "") {
			const foundFattura = appState.fatture.find(
				found => found.id === state.selectedId
			);
			setState(prevState => {
				return {
					...prevState,
					tabIndex: 0,
					totaleFattura: calcolaTotale(foundFattura),
					fattura: foundFattura
				};
			});
		} else {
			setState(previousState => ({
				selectedId: "",
				add: false,
				tabIndex: 0,
				totaleFattura: 0,
				ddtDialogOpen: false,
				fattura: {
					id: Date.now(),
					azienda: appState.aziende[0].id,
					numero: "",
					mese: "",
					anno: "",
					dettagli: [],
					ddt: []
				}
			}));
		}
	}, [state.selectedId, appState.fatture, appState.aziende]);

	return (
		<FatturaContext.Provider
			value={{ fatturaState: state, setFatturaState: setState }}
		>
			<Grid container className={classes.gridContainer} spacing={1}>
				<Grid className={classes.gridItem} item xs={2}>
					<FattureList />
				</Grid>
				<Grid item className={classes.gridItem} xs={10}>
					<FattureSelected />
				</Grid>
			</Grid>
		</FatturaContext.Provider>
	);
}

export default withStyles(styles, { withTheme: true })(Fatture);
