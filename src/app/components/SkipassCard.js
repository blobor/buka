import React from 'react'
import { getAdoptedDateString } from '../helpers/date'

const SkipassCard = ({ skipass }) => {
  return (
    <article className='skipass-card skipass-card--shadow skipass-card skipass-card--shadow-animated'>
      <header className='skipass-card__header'>
        <h5 className='skipass-card__title'>{skipass.name}</h5>
      </header>
      <main className='skipass-card__main-container'>
        <h5 className='skipass-card__card-number'>{skipass.cardNumber}</h5>
        <section className='skipass-card__info-container'>
          <time className='skipass-card__purchase-date' dateTime={skipass.purchaseDate}>{ getAdoptedDateString(skipass.purchaseDate) }</time>
        </section>
        <section className='skipass-card__balance-container'>
          <h5 className='skipass-card__balance-title'>Balance</h5>
          <span className='skipass-card__balance'>0</span>
        </section>
      </main>
    </article>
  )
}

export default SkipassCard
