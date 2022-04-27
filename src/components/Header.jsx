import React from 'react'

const Header = ({ rates, usd, eur, pln }) => {
  return (
    <div className='header'>
      <ul className="header__list">
        <li className="header__item">USD: {usd}</li>
        <li className="header__item">EUR: {eur}</li>
        <li className="header__item">PLN: {pln}</li>
      </ul>
    </div>
  )
}

export default Header