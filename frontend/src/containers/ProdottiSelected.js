import React, { useState, useContext, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography, Button } from "@material-ui/core";
// import ProdottiFormVersioni from "../components/ProdottiFormVersioni";
// import ProdottiFormBody from "../components/ProdottiFormBody";
import SaveIcon from "@material-ui/icons/Save";

import DeleteIcon from "@material-ui/icons/Delete";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Context } from "../App";
import ProdottiFormBody from "../components/ProdottiFormBody";
import ProdottiFormVersioni from "../components/ProdottiFormVersioni";

const styles = theme => ({
	container: {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		padding: theme.spacing(3)
	},
	formContainer: {
		display: "flex",
		height: "100%",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},
	buttonIcon: {
		marginRight: theme.spacing(1.5)
	},
	actionButton: {
		width: "35%"
	},
	buttonContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between"
	}
});

function ProdottiSelected(props) {
	const { appState, dispatch } = useContext(Context);

	const [utilsState, setUtilsState] = useState({
		areYouSure: false
	});

	const [state, setState] = useState({});

	useEffect(() => {
		setUtilsState(() => ({
			areYouSure: false
		}));
		if (props.selectedId !== "") {
			setState(() =>
				appState.prodotti.find(found => found.id === props.selectedId)
			);
		} else {
			setState(previousState => ({
				id: "",
				azienda: appState.aziende[0].id,
				nome: "",
				prezzo: 1,
				udm: appState.udm[0],
				versioni: []
			}));
		}
	}, [props.selectedId, appState.prodotti, appState.udm, appState.aziende]);

	const { classes } = props;
	return (
		<Paper className={classes.container}>
			{!props.add && props.selectedId === "" ? (
				<Typography variant="h5" color="inherit">
					Seleziona un prodotto per continuare
				</Typography>
			) : (
				<>
					<form
						id="myform"
						onSubmit={e => {
							e.preventDefault();

							props.setParentState(previousState => ({
								add: false,
								selectedId: ""
							}));
							if (props.add) {
								dispatch({
									type: "prodotto-add",
									payload: {
										...state,
										id: Date.now()
									}
								});
							} else {
								dispatch({
									type: "prodotto-update",
									payload: state,
									selectedId: props.selectedId
								});
							}
						}}
						className={classes.formContainer}
					>
						<ProdottiFormBody parentState={state} setParentState={setState} />

						<ProdottiFormVersioni
							parentState={state}
							setParentState={setState}
						/>
						<div className={classes.buttonContainer}>
							<Button
								className={classes.actionButton}
								onClick={() => {
									if (utilsState.areYouSure) {
										props.setParentState(previousState => ({
											add: false,
											selectedId: ""
										}));
										setUtilsState(previousState => ({ areYouSure: false }));
										dispatch({ type: "prodotto-delete", payload: state.id });
									} else {
										setUtilsState(previousState => ({
											...previousState,
											areYouSure: true
										}));
									}
								}}
								color="secondary"
							>
								{utilsState.areYouSure ? (
									"Sei sicuro?"
								) : (
									<>
										<DeleteIcon className={classes.buttonIcon} />
										Elimina Prodotto
									</>
								)}
							</Button>
							<Button
								className={classes.actionButton}
								type="submit"
								form="myform"
								color="primary"
							>
								{props.add ? (
									<>
										<AddShoppingCartIcon className={classes.buttonIcon} />
										Aggiungi Prodotto
									</>
								) : (
									<>
										<SaveIcon className={classes.buttonIcon} />
										Salva Modifiche
									</>
								)}
							</Button>
						</div>
					</form>
				</>
			)}
		</Paper>
	);
}

export default withStyles(styles, { withTheme: true })(ProdottiSelected);
