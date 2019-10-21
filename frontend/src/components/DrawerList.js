import React from "react";
import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, Route } from "react-router-dom/cjs/react-router-dom";

import DashboardIcon from "@material-ui/icons/Dashboard";
import DescriptionIcon from "@material-ui/icons/Description";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BusinessIcon from "@material-ui/icons/Business";

const styles = theme => ({
	link: {
		textDecoration: "none"
	},
	listItem: {
		marginBottom: "10px"
	}
});

function DrawerList(props) {
	const { classes } = props;

	return (
		<Route>
			{({ location }) => (
				<List>
					<Link className={classes.link} to="/dashboard">
						<ListItem button selected={location.pathname === "/dashboard"}>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText className={classes.listItem} primary="Dashboard" />
						</ListItem>
					</Link>
					<Link className={classes.link} to="/fatture">
						<ListItem button selected={location.pathname === "/fatture"}>
							<ListItemIcon>
								<DescriptionIcon />
							</ListItemIcon>
							<ListItemText className={classes.listItem} primary="Fatture" />
						</ListItem>
					</Link>
					<Link className={classes.link} to="/prodotti">
						<ListItem button selected={location.pathname === "/prodotti"}>
							<ListItemIcon>
								<ShoppingCartIcon />
							</ListItemIcon>
							<ListItemText className={classes.listItem} primary="Prodotti" />
						</ListItem>
					</Link>
					<Link className={classes.link} to="/aziende">
						<ListItem button selected={location.pathname === "/aziende"}>
							<ListItemIcon>
								<BusinessIcon />
							</ListItemIcon>
							<ListItemText className={classes.listItem} primary="Aziende" />
						</ListItem>
					</Link>
				</List>
			)}
		</Route>
	);
}

export default withStyles(styles, { withTheme: true })(DrawerList);
