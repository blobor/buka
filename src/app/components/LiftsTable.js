import React from 'react'
import { getAdoptedDateString } from '../helpers/date'

const getLiftsRows = lifts => {
  return lifts.map((liftInfo, index) => (
    <tr key={index}>
      <td>{++index}</td>
      <td>{liftInfo.id}</td>
      <td className='mdl-data-table__cell--non-numeric'>{getAdoptedDateString(liftInfo.date)}</td>
    </tr>
  ))
}

const LiftsTable = ({ lifts }) => (
  <table className='mdl-data-table lifts-table mdl-shadow--2dp'>
    <thead>
      <tr>
        <th>#</th>
        <th>Lift</th>
        <th className='mdl-data-table__cell--non-numeric'>Date</th>
      </tr>
    </thead>
    <tbody>
      {getLiftsRows(lifts)}
    </tbody>
  </table>
)

export default LiftsTable
