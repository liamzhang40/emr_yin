import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  Tooltip,
  Typography,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { clearErrors } from '../../actions/patient_actions';
import CreatePatientFormContainer from '../forms/patient_form_container';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class CustomizedDialogs extends React.Component {
  constructor() {
    super();
    
    this.state={
      open: false,
    };
  }

  _handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  _handleClose = () => {
    this.setState({ open: false }, () => {
      this.props.clearErrors();
    });
  };

  _renderDialogContent = () => {
    const { dialogType } = this.props;

    switch(dialogType) {
      case "patient":
        return {
          openDialogButton: 
            <Tooltip title={`Add ${dialogType}`}>
              <IconButton aria-label={`Add ${dialogType}`} onClick={this._handleClickOpen}>
                <AddIcon />
              </IconButton>
            </Tooltip>,
          dialogTitle: "New Patient",
          dialogContent: <CreatePatientFormContainer 
            formType="createPatient" 
            closeModal={this._handleClose}
          />,
        }
      case "visit":
        return {
          openDialogButton:
            <Tooltip title={`Add ${dialogType}`}>
              <IconButton aria-label={`Add ${dialogType}`} onClick={this._handleClickOpen}>
                <AddIcon />
              </IconButton>
            </Tooltip>,
          dialogTitle: "New Visit",
        }
      default:
        return {
          openDialogButton: <Button variant="outlined" color="secondary" onClick={this._handleClickOpen}>
            Open dialog
          </Button>,
          dialogTitle: "Dialog Title",
          dialogContent: "Input Content Here",
          dialogActions:
            <DialogActions>
              <Button onClick={this._handleClose} color="primary">
                Save changes
              </Button>
            </DialogActions>,
        }
    }
  }

  render() {
    const { openDialogButton, dialogTitle, dialogContent, dialogActions } = this._renderDialogContent()

    return (
      <Fragment>
        {openDialogButton}
        <Dialog
          onClose={this._handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this._handleClose}>
            {dialogTitle}
          </DialogTitle>
          <DialogContent dividers>
            {dialogContent}
          </DialogContent>
            {dialogActions}
        </Dialog>
      </Fragment>
    );
  }
}

CustomizedDialogs.defaultProps = {
  clearErrors: () => null
}

export default connect(null, {
  clearErrors
})(CustomizedDialogs);