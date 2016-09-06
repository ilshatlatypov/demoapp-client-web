import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarWithMenu from './AppBarWithMenu';
import DrawerSimpleExample from './DrawerSimpleExample';
import PaperWithList from './PaperWithList';
import Paper from 'material-ui/Paper';

import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

const textPaperStyle = {
  paper: {
    padding: 16,
    width: "100%"
  },
  header: {
    marginTop: 0, 
    marginBottom: 8, 
    fontWeight: "400"
  },
  paragraph: {
    margin: 0
  }
};

class NewMain extends React.Component {
  constructor() {
    super();
  }

  openDrawer = () => this.refs.drawer.handleToggle();

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBarWithMenu onLeftIconButtonTouchTap={this.openDrawer} />
          <DrawerSimpleExample ref="drawer" />
          <div className="container">
            <div className="row row-eq-height">
              <div className="col-lg-3 col-md-6">
                <Paper style={{width: "100%"}}>
                  <List>
                    <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                    <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
                    <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                    <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                    <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                  </List>
                </Paper>
              </div>
              <div className="col-lg-3 col-md-6">
                <Paper style={{width: "100%"}}>
                  <List>
                    <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
                    <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
                    <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
                    <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
                  </List>
                </Paper>
              </div>
              <div className="col-lg-3 col-md-6">
                <Paper style={textPaperStyle.paper}>
                  <h2 style={textPaperStyle.header}>Main Header</h2>
                  <p style={textPaperStyle.paragraph}>Responsive layouts in material design adapt to any possible screen size. This UI guidance includes a flexible grid that ensures consistency across layouts, breakpoint details about how content reflows on different screens, and a description of how an app can scale from small to extra-large screens.</p>
                </Paper>
              </div>
              <div className="col-lg-3 col-md-6">
                <Paper style={textPaperStyle.paper}>
                  <h2 style={textPaperStyle.header}>Главный заголовок</h2>
                  <p style={textPaperStyle.paragraph}>Наш мозг необычайно пластичен. Не как пластиковая посуда или кукла Барби – в неврологии пластичность означает удивительную способность мозга меняться и адаптироваться практически ко всему, что с нами происходит. В былые времена учёные считали, что когда человек переставал быть ребёнком, его мозг застывал, как глиняный горшок, и оставался в одной форме.</p>
                </Paper>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6"><Paper style={{width: "100%", height: 250}} /></div>
              <div className="col-lg-3 col-md-6"><Paper style={{width: "100%", height: 250}} /></div>
              <div className="col-lg-3 col-md-6"><Paper style={{width: "100%", height: 250}} /></div>
              <div className="col-lg-3 col-md-6"><Paper style={{width: "100%", height: 250}} /></div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
};

export default NewMain;