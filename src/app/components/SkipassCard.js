import React from 'react'

const SkipassCard = ({ skipass }) => {
  return (
    <article className='skipass-card skipass-card--shadow'>
      <h5>{skipass.cardNumber}</h5>
    </article>
  )
}

export default SkipassCard
