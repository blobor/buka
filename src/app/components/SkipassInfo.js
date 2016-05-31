import React from 'react';
import LiftsTable from './LiftsTable';
import { getAdoptedDateString } from '../helpers/date';

const SkipassInfo = (props) => (
  <section className='scipass-info'>
    <h5>{props.skipass.name}</h5>
    <table className='mdl-data-table mdl-shadow--2dp scipass-info__table'>
      <tbody>
        <tr>
          <td>Сard Number</td>
          <td className='mdl-data-table__cell--non-numeric'>
            {props.skipass.cardNumber}
          </td>
        </tr>
        <tr>
          <td>Purchase Date</td>
          <td>
            {getAdoptedDateString(props.skipass.purchaseDate)}
          </td>
        </tr>
        <tr>
          <td>Used Days</td>
          <td className='mdl-data-table__cell--non-numeric'>
            {props.skipass.usedDays}
          </td>
        </tr>
        <tr>
          <td>Total Downhills</td>
          <td className='mdl-data-table__cell--non-numeric'>
            {props.skipass.totalDownhills}
          </td>
        </tr>
        <tr>
          <td>Daily Downhills (avg.)</td>
          <td className='mdl-data-table__cell--non-numeric'>
            {props.skipass.dailyAverageDownhills}
          </td>
        </tr>
      </tbody>
    </table>
    <br/>
    <LiftsTable lifts={props.skipass.lifts} />
  </section>
);

SkipassInfo.propTypes = {
  skipass: React.PropTypes.object.isRequired
};

export default SkipassInfo;
