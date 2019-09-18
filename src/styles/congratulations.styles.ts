import { createStyles } from '@material-ui/core/styles';

export default createStyles((theme: any) => ({
	paper: {
		width: 528,
		padding: theme.spacing(3)
	},
	headerDiv: {
		display: 'flex',
		justifyContent: 'center',
		paddingTop: theme.spacing(1.875),
		paddingBottom: theme.spacing(1.875)
	},
	headerText: {
		fontSize: 40
	},
	bold: {
		fontWeight: 'bold'
	},
	mainText: {
		marginTop: theme.spacing(3)
	},
	button: {
		width: '100%',
		height: 60,
		fontWeight: 'bold',
		marginTop: theme.spacing(3)
	},

}));