import React from 'react'
import isEmpty from 'lodash.isempty'
import isNil from 'lodash.isnil'
import LiftsTable from './LiftsTable'
import { getAdoptedDateString } from '../helpers/date'

const renderLifts = lifts => isEmpty(lifts) ? null : <LiftsTable lifts={lifts} />
const renderNullableValue = (label, value) => {
  if (isNil(value)) {
    return null
  }

  return (
    <tr>
      <td>{ label }</td>
      <td className='md-data-table__cell--non-numeric'>
        { value }
      </td>
    </tr>
  )
}

const SkipassInfo = ({ skipass }) => (
  <article className='skipass-info'>
    <h5>{skipass.name}</h5>
    <table className='md-data-table md-shadow--2dp skipass-info__table'>
      <tbody>
        <tr>
          <td>Сard Number</td>
          <td className='md-data-table__cell--non-numeric'>
            {skipass.cardNumber}
          </td>
        </tr>
        { renderNullableValue('Ticket number', skipass.ticketNumber) }
        { renderNullableValue('Purchase Date', getAdoptedDateString(skipass.purchaseDate)) }
        { renderNullableValue('Last Update', getAdoptedDateString(skipass.syncDate)) }
      </tbody>
    </table>
    { renderLifts(skipass.lifts) }
  </article>
)

SkipassInfo.propTypes = {
  skipass: React.PropTypes.object.isRequired
}

export default SkipassInfo
