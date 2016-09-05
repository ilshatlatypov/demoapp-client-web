import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import PersonDefault from 'material-ui/svg-icons/social/person';
import FileFolder from 'material-ui/svg-icons/file/folder';

const style = {
  width: 1280,
  marginLeft: 'auto',
  marginRight: 'auto'
}

class PaperWithList extends React.Component {

  render() {
    return (
      <Paper style={style}>
        <List>
          <Subheader>Recent chats</Subheader>
          <ListItem
            primaryText="Brendan Lim"
            leftAvatar={<Avatar icon={<PersonDefault />}/>}
            rightIcon={<CommunicationChatBubble />} />
          <ListItem
            primaryText="Eric Hoffman"
            leftAvatar={<Avatar icon={<PersonDefault />}/>}
            rightIcon={<CommunicationChatBubble />} />
          <ListItem
            primaryText="Grace Ng"
            leftAvatar={<Avatar icon={<PersonDefault />}/>}
            rightIcon={<CommunicationChatBubble />} />
          <ListItem
            primaryText="Kerem Suer"
            leftAvatar={<Avatar icon={<PersonDefault />}/>}
            rightIcon={<CommunicationChatBubble />} />
          <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar icon={<PersonDefault />}/>}
            rightIcon={<CommunicationChatBubble />} />
        </List>
        <Divider />
        <List>
          <Subheader>Previous chats</Subheader>
          <ListItem
            primaryText="Chelsea Otakan"
            leftAvatar={<Avatar icon={<PersonDefault />}/>} />
          <ListItem
            primaryText="James Anderson"
            leftAvatar={<Avatar icon={<PersonDefault />}/>} />
        </List>
      </Paper>
    )
  }
};

export default PaperWithList;