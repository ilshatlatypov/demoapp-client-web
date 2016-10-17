import React, {PropTypes} from 'react';
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress'
import client from './client';
import DialogCreateUser from './DialogCreateUser'

const styles = {
  mainPaper: {
    width: 1200, 
    margin: 24, 
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

class UserList extends React.Component {
  constructor() {
    super();
    this.state = {users: [], showResults: false};
  }

  componentDidMount = () => 
    client({method: 'GET', path: 'http://localhost:8080/users?sort=firstname&sort=lastname', username: this.context.username, password: this.context.password}).then(response => {
      this.setState({users: response.entity._embedded.users, showResults: true});
    });

  render() {
      var users = this.state.users.map(user =>
        <div key={user._links.self.href}>
          <ListItem primaryText={user.firstname + " " + user.lastname} />
          <Divider />
        </div>
      );
      return (
        <div>
          <Paper style={styles.mainPaper}>
            { this.state.showResults ? <List>{users}</List> : <CircularProgress/> }
          </Paper>
          <DialogCreateUser/>
        </div>
      )
  }
};

UserList.contextTypes = {
  username: PropTypes.string,
  password: PropTypes.string
};

export default UserList;