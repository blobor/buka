import React, { PropTypes } from 'react'
import { getAdoptedDateString } from '../helpers/date'

const getLiftsRows = lifts => {
  return lifts.map((liftInfo, index) => (
    <tr key={index}>
      <td>{++index}</td>
      <td>{liftInfo.id}</td>
      <td>{ getAdoptedDateString(liftInfo.date) }</td>
      <td>{liftInfo.initialLift}</td>
      <td>{liftInfo.liftsLeft}</td>
    </tr>
  ))
}

const LiftsTable = ({ lifts }) => (
  <table className='mdl-data-table lifts-table mdl-shadow--2dp'>
    <thead>
      <tr>
        <th>#</th>
        <th>Lift</th>
        <th>Date</th>
        <th>Initial Lift</th>
        <th>Lifts Left</th>
      </tr>
    </thead>
    <tbody>
      { getLiftsRows(lifts) }
    </tbody>
  </table>
)

LiftsTable.propTypes = {
  lifts: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default LiftsTable
