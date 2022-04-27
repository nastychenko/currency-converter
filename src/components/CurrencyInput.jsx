import React from 'react';
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

const CurrencyInput = ({amount, currency, currencies, onAmountChange, onCurrencyChange}) => {
  return (
    <div className="field">
      <input
        className='field__input'
        type="number"
        value={amount}
        onChange={e => onAmountChange(e.target.value)}
      />
      <select
        value={currency}
        onChange={e => onCurrencyChange(e.target.value)}
        className='field__select'
      >
        {currencies.map(cur => (
          <option value={cur} key={nanoid()}>{cur}</option>
        ))}
      </select>
    </div>
  )
}

CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
}

export default CurrencyInput