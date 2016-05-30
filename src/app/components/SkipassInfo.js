import React from 'react';
import Paper from 'material-ui/Paper';
import LiftsTable from './LiftsTable';

const SkipassInfo = (props) => (
  <section className='scipass-info'>
    <Paper zDepth={1}>
      <h5>{props.skipass.name}</h5>
      <p>{`Сard Number: ${props.skipass.cardNumber}`}</p>
      <p>{`Purchase Date: ${props.skipass.purchaseDate}`}</p>
      <p>{`Used Days: ${props.skipass.usedDays}`}</p>
      <p>{`Total Downhills: ${props.skipass.totalDownhills}`}</p>
      <p>{`Daily Average Downhills: ${props.skipass.dailyAverageDownhills}`}</p>
    </Paper>
    <br/>
    <LiftsTable lifts={props.skipass.lifts} />
  </section>
);

SkipassInfo.propTypes = {
  skipass: React.PropTypes.object.isRequired
};

export default SkipassInfo;
