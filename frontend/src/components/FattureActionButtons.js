import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import CodeIcon from "@material-ui/icons/Code";
import SaveIcon from "@material-ui/icons/Save";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { FatturaContext } from "../pages/Fatture";

const styles = theme => ({
	buttonIcon: {
		marginRight: theme.spacing(1.5)
	}
});

function FattureActionButtons(props) {
	const { classes } = props;
	const { fatturaState } = useContext(FatturaContext);

	return (
		<>
			<div className={classes.buttonContainer}>
				<Button
					className={classes.actionButton}
					type="submit"
					form="fatturaForm"
					color="primary"
				>
					{fatturaState.add ? (
						<>
							<NoteAddIcon className={classes.buttonIcon} />
							Crea Fattura
						</>
					) : (
						<>
							<SaveIcon className={classes.buttonIcon} />
							Salva Modifiche
						</>
					)}
				</Button>

				{!fatturaState.add ? (
					<>
						<Button
							className={classes.actionButton}
							onClick={() => {}}
							color="primary"
						>
							<PictureAsPdfIcon className={classes.buttonIcon} />
							Esporta PDF
						</Button>
						<Button
							className={classes.actionButton}
							onClick={() => {}}
							color="primary"
						>
							<CodeIcon className={classes.buttonIcon} />
							Esporta XML
						</Button>
					</>
				) : (
					""
				)}
			</div>
		</>
	);
}

export default withStyles(styles, { withTheme: true })(FattureActionButtons);
