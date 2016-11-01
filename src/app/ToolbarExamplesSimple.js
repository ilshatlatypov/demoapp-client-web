import React, {PropTypes} from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick = () => console.log('clicked');

  getStyles = function(context) {
    var appBar = context.muiTheme.appBar;
    var iconButtonSize = context.muiTheme.button.iconButtonSize;
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

    return styles;
  }

  render() {
    var styles = this.getStyles(this.context);
    return (
      <Toolbar style={styles.root}>

        <ToolbarGroup firstChild={true}>
          <IconButton style={styles.iconButtonLeftStyle} iconStyle={styles.iconButtonIconStyle} onTouchTap={this.props.onMenuIconButtonTouchTap}>
            <NavigationMenu />
          </IconButton>
          <h1 style={styles.title}>{this.props.title}</h1>
        </ToolbarGroup>

      </Toolbar>
    );
  }
}

ToolbarExamplesSimple.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default ToolbarExamplesSimple;
