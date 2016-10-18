import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import STR from './strings';

export default class SnackbarExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleRequestOpen = () => {
    this.setState({
      open: true,
    });
  };  

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={STR.prompt_employee_added}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}