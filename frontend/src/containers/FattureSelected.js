import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Tab, Tabs, Typography } from "@material-ui/core/";

import ListIcon from "@material-ui/icons/List";
import InfoIcon from "@material-ui/icons/Info";
import FattureInfo from "./FattureInfo";
import FattureDettagli from "../components/FattureDettagli";
import { FatturaContext } from "../pages/Fatture";

const styles = theme => ({
	paperContainer: {
		padding: theme.spacing(3),
		paddingTop: 0,
		height: "100%"
	},
	welcomePadding: {
		paddingTop: theme.spacing(3)
	},
	tabBodyContainer: {
		paddingTop: theme.spacing(3),
		height: "calc(100% - 48px)"
	},
	tabLabel: {
		"& span": {
			marginRight: "20px",
			flexDirection: "row",
			justifyContent: "space-evenly",
			alignItems: "center"
		}
	}
});

function FattureSelectedTab(props) {
	const { classes } = props;
	const { fatturaState, setFatturaState } = useContext(FatturaContext);

	return (
		<Paper className={classes.paperContainer}>
			{!fatturaState.add && fatturaState.selectedId === "" ? (
				<div className={classes.welcomePadding}>
					<Typography variant="h5" color="inherit">
						Seleziona una fattura per continuare
					</Typography>
				</div>
			) : (
				<>
					<Tabs
						value={fatturaState.tabIndex}
						onChange={(e, value) =>
							setFatturaState(previousState => ({
								...previousState,
								tabIndex: value
							}))
						}
						variant="fullWidth"
						className={classes.tabLabelContainer}
						indicatorColor="primary"
						textColor="primary"
					>
						<Tab
							className={classes.tabLabel}
							label="Informazioni Generali"
							icon={<InfoIcon />}
						/>
						<Tab
							className={classes.tabLabel}
							label="Dettagli"
							icon={<ListIcon />}
						/>
					</Tabs>
					<div className={classes.tabBodyContainer}>
						{fatturaState.tabIndex === 0 ? (
							<FattureInfo />
						) : (
							<FattureDettagli />
						)}
					</div>
				</>
			)}
		</Paper>
	);
}

export default withStyles(styles, { withTheme: true })(FattureSelectedTab);
