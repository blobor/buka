import React from 'react'
import classNames from 'classnames'
import { getAdoptedDateString } from '../helpers/date'

const renderSkipassBalance = skipass => {
  if (skipass.isUnUsed) {
    return (
      <section className='skipass-card__balance-container'>
        <h5 className='skipass-card__balance-title'>Unused</h5>
      </section>
    )
  }

  return (
    <section className='skipass-card__balance-container'>
      <h5 className='skipass-card__balance-title'>Balance</h5>
      <span className='skipass-card__balance'>{skipass.balance}</span>
    </section>
  )
}

const SkipassCard = ({ skipass }) => {
  const className = classNames('skipass-card', 'material-shadow--z1', 'material-shadow--z1-animated', 'material-shadow--z1-interactive', {
    'skipass-card--zero-balance': skipass.balance === 0
  })

  return (
    <article className={className}>
      <header className='skipass-card__header'>
        <h5 className='skipass-card__title'>{skipass.name}</h5>
      </header>
      <main className='skipass-card__main-container'>
        <h5 className='skipass-card__card-number'>{skipass.cardNumber}</h5>
        <section className='skipass-card__info-container'>
          <time className='skipass-card__purchase-date' dateTime={skipass.purchaseDate}>{ getAdoptedDateString(skipass.purchaseDate) }</time>
        </section>
        { renderSkipassBalance(skipass) }
      </main>
    </article>
  )
}

export default SkipassCard
