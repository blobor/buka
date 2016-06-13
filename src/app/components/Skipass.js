import React, { PropTypes } from 'react';
import isEmpty from 'lodash.isempty';

import SkipassInfo from './SkipassInfo';
import CircularProgress from 'material-ui/CircularProgress';

const Skipass = ({ skipass }) => {
  if (skipass.isFetching) {
    return <CircularProgress size={1.5} />;
  } else if (!isEmpty(skipass.lifts)) {
    return <SkipassInfo skipass={skipass} />;
  }
  return null;
};

Skipass.propTypes = {
  skipass: PropTypes.object
};

export default Skipass;
