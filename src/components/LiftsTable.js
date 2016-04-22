import React from 'react';
import Table from 'material-ui/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableHeader from 'material-ui/Table/TableHeader';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableBody from 'material-ui/Table/TableBody';

const showCheckboxes = false;

const LiftsTable = (props) => (
  <Table>
    <TableHeader
        displaySelectAll={showCheckboxes}
        adjustForCheckbox={showCheckboxes}>
      <TableRow>
        <TableHeaderColumn>Index</TableHeaderColumn>
        <TableHeaderColumn>Lift ID</TableHeaderColumn>
        <TableHeaderColumn>Date</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={showCheckboxes}>
      {getLiftsRows(props.lifts)}
    </TableBody>
  </Table>
);

LiftsTable.propTypes = {
  lifts: React.PropTypes.arrayOf(React.PropTypes.object)
};

function getLiftsRows(lifts) {
  return lifts.map((liftInfo, index) => (
    <TableRow key={index}>
      <TableRowColumn>{++index}</TableRowColumn>
      <TableRowColumn>{liftInfo.id}</TableRowColumn>
      <TableRowColumn>{liftInfo.date}</TableRowColumn>
    </TableRow>
  ));
}

export default LiftsTable;