import React from 'react'
import Snackbar from 'material-ui/Snackbar'

export default class MySnackbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleRequestOpen = () => this.setState({ open: true })

  handleRequestClose = () => this.setState({ open: false })

  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={this.props.message}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    )
  }
}
