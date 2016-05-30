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
          <td>{props.skipass.cardNumber}</td>
        </tr>
        <tr>
          <td>Purchase Date</td>
          <td className='mdl-data-table__cell--non-numeric'>
            {getAdoptedDateString(props.skipass.purchaseDate)}
          </td>
        </tr>
        <tr>
          <td>Used Days</td>
          <td>{props.skipass.usedDays}</td>
        </tr>
        <tr>
          <td>Total Downhills</td>
          <td>{props.skipass.totalDownhills}</td>
        </tr>
        <tr>
          <td>Daily Downhills (avg.)</td>
          <td>{props.skipass.dailyAverageDownhills}</td>
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
