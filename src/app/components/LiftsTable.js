import React from 'react';

const LiftsTable = (props) => (
  <table className='mdl-data-table lifts-table mdl-shadow--2dp'>
    <thead>
      <tr>
        <th>#</th>
        <th>Lift</th>
        <th className='mdl-data-table__cell--non-numeric'>Date</th>
      </tr>
    </thead>
    <tbody>
      {getLiftsRows(props.lifts)}
    </tbody>
  </table>
);

LiftsTable.propTypes = {
  lifts: React.PropTypes.arrayOf(React.PropTypes.object)
};

function getLiftsRows(lifts) {
  return lifts.map((liftInfo, index) => (
    <tr key={index}>
      <td>{++index}</td>
      <td>{liftInfo.id}</td>
      <td className='mdl-data-table__cell--non-numeric'>{liftInfo.date}</td>
    </tr>
  ));
}

export default LiftsTable;