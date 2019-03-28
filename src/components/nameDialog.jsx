import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import ErrorSnackbarContent from './errorSnackBar';
import { withMobileDialog } from '@material-ui/core';

class NameDialog extends Component {
  state = {
    dialogOpen: true,
    snackbarOpen: false,
    fullName: null
  };

  handleDialogClose = () => {
    const { fullName } = this.state;

    if (
      !fullName ||
      fullName.trim() === '' ||
      fullName.trim().split(' ').length < 2
    ) {
      this.setState({ snackbarOpen: true });
    } else {
      this.setState({ dialogOpen: false, snackbarOpen: false });
      localStorage.setItem('USER_FULLNAME', fullName.trim());
      this.props.onDone(fullName.trim());
    }
  };

  handleSnakbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  handleNameChanged = event => {
    this.setState({
      fullName: event.target.value
    });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog fullScreen={fullScreen} open={this.state.dialogOpen}>
          <DialogTitle>Your Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To enter chat room you should enter your name.
            </DialogContentText>
            <form autoComplete="off">
              <TextField
                margin="normal"
                label="Full Name"
                variant="outlined"
                onChange={this.handleNameChanged}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.handleDialogClose();
                    event.preventDefault();
                  }
                }}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleDialogClose}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleSnakbarClose}
        >
          <ErrorSnackbarContent message="You should enter first and last name!" />
        </Snackbar>
      </div>
    );
  }
}

export default withMobileDialog()(NameDialog);
