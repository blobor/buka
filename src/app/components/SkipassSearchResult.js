import React from 'react'
import isNil from 'lodash.isnil'

import SkipassInfo from './SkipassInfo'
import CircularProgress from 'material-ui/CircularProgress'

const SkipassSearchResult = ({ search }) => {
  if (search.isFetching) {
    return <CircularProgress size={90} thickness={5} />
  } else if (search.error) {
    return <p>{search.error}</p>
  } else if (isNil(search.skipass)) {
    return null
  } else {
    return <SkipassInfo skipass={search.skipass} />
  }
}

export default SkipassSearchResult
