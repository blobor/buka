import React from 'react'
import isNil from 'lodash.isnil'

import SkipassInfo from './SkipassInfo'
import CircularProgress from 'material-ui/CircularProgress'

const Skipass = ({ skipass, error, isFetching = false }) => {
  if (isFetching) {
    return <CircularProgress size={90} thickness={5} />
  } else if (!isNil(error)) {
    return <p>{error}</p>
  } else if (isNil(skipass)) {
    return null
  }

  return <SkipassInfo skipass={skipass} />
}

export default Skipass
