import React, {PropTypes} from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    var appBar = this.context.muiTheme.appBar;
    var iconButtonSize = this.context.muiTheme.button.iconButtonSize;
    var styles = {
      root: {
        height: appBar.height,
        backgroundColor: appBar.color,
      },
      title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 0,
        paddingTop: 0,
        letterSpacing: 0,
        fontSize: 24,
        fontWeight: appBar.titleFontWeight,
        color: appBar.textColor,
        height: appBar.height,
        lineHeight: appBar.height + 'px'
      },
      iconButtonLeftStyle: {
        marginTop: (appBar.height - iconButtonSize) / 2,
        marginRight: 8,
        marginLeft: 8
      },
      iconButtonRightStyle: {
        marginTop: (appBar.height - iconButtonSize) / 2,
        marginRight: -16
      },
      iconButtonIconStyle: {
        fill: appBar.textColor,
        color: appBar.textColor
      }
    };

    return (
      <Toolbar style={styles.root}>

        <ToolbarGroup firstChild={true}>
          <IconButton style={styles.iconButtonLeftStyle} iconStyle={styles.iconButtonIconStyle}>
            <NavigationMenu />
          </IconButton>
          <h1 style={styles.title}>Title</h1>
        </ToolbarGroup>

        <ToolbarGroup>
          <IconMenu style={{ color: this.context.muiTheme.palette.textColor}}
            iconButtonElement={
              <IconButton style={styles.iconButtonRightStyle} iconStyle={styles.iconButtonIconStyle}>
                <MoreVertIcon />
              </IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

ToolbarExamplesSimple.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default ToolbarExamplesSimple;