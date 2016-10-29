import {TableRow} from 'material-ui/Table'

export default class Employee extends TableRow {
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.hovered !== nextState.hovered || this.props.selected !== nextProps.selected;
  }
}
