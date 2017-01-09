import React from 'react'
import SkipassCard from './SkipassCard.component'

const SkipassGridList = ({ skipasses, onRemoveSkipass }) => {
  return (
    <section className='skipasess__container'>
      {skipasses.map((skipass, index) => <SkipassCard key={index} skipass={skipass} onRemoveSkipass={onRemoveSkipass} />)}
    </section>
  )
}

export default SkipassGridList
