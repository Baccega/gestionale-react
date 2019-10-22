import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import { Context } from "../App";

const styles = theme => ({
	container: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%"
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginLeft: 0,
		marginRight: theme.spacing(3),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto"
		}
	},
	searchIcon: {
		width: theme.spacing(9),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	inputRoot: {
		color: "inherit",
		width: "100%"
	},
	inputInput: {
		paddingTop: theme.spacing(1),
		paddingRight: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		paddingLeft: theme.spacing(10),
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: 120,
			"&:focus": {
				width: 200
			}
		}
	}
});

function Header(props) {
	const { classes } = props;

	const { appState, dispatch } = useContext(Context);

	return (
		<Route>
			{({ location }) => (
				<div className={classes.container}>
					{" "}
					<Typography
						className={classes.grow}
						variant="h6"
						color="inherit"
						noWrap
					>
						{location.pathname === "/dashboard"
							? "Gestionale React"
							: ""}
						{location.pathname === "/fatture" ? "Fatture" : ""}
						{location.pathname === "/prodotti" ? "Prodotti" : ""}
						{location.pathname === "/aziende" ? "Aziende" : ""}
						{location.pathname === "/settings" ? "Impostazioni" : ""}
					</Typography>
					<>
						{location.pathname.includes("/fatture") ||
						location.pathname.includes("/prodotti") ? (
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder="Cerca…"
									onChange={e =>
										dispatch({ type: "search-update", payload: e.target.value })
									}
									value={appState.search}
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput
									}}
								/>
							</div>
						) : (
							""
						)}
					</>
				</div>
			)}
		</Route>
	);
}

export default withStyles(styles, { withTheme: true })(Header);
