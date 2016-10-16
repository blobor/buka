import React from 'react'

const SkipassCard = ({ skipass }) => {
  return (
    <article className='skipass-card skipass-card--shadow skipass-card skipass-card--shadow-animated'>
      <header className='skipass-card__header'>
        <h5 className='skipass-card__title'>{skipass.cardNumber}</h5>
      </header>
      <main />
    </article>
  )
}

export default SkipassCard
