import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import CurrencyInput from './CurrencyInput';
import Header from './Header';


const Converter = () => {
  const [amountFirst, setAmountFirst] = useState(1);
  const [amountSecond, setAmountSecond] = useState(1);
  const [currencyFirst, setCurrencyFirst] = useState('UAH');
  const [currencySecond, setCurrencySecond] = useState('USD');
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get("https://api.apilayer.com/exchangerates_data/latest?apikey=xTC1mIOHsn59kWg8d2wu1X4S40VsKNnW&base=UAH")
      .then(response => {
        setRates(response.data.rates);
      })
  }, []);

  useEffect(() => {
    if (!!rates) amoutnSecondChange(1);
  }, [rates]);

  const format = number => number.toFixed(2);

  const amoutnFirstChange = amountFirst => {
    setAmountSecond(format(amountFirst * rates[currencySecond] / rates[currencyFirst]));
    setAmountFirst(amountFirst);
  };

  const currencyFirstChange = currencyFirst => {
    setAmountSecond(format(amountFirst * rates[currencySecond] / rates[currencyFirst]));
    setCurrencyFirst(currencyFirst);
  };

  const amoutnSecondChange = amountSecond => {
    setAmountFirst(format(amountSecond * rates[currencyFirst] / rates[currencySecond]));
    setAmountSecond(amountSecond);
  };

  const currencySecondChange = currencySecond => {
    setAmountFirst(format(amountSecond * rates[currencyFirst] / rates[currencySecond]));
    setCurrencySecond(currencySecond);
  };


  return (
    <>
      <Header
        rates={rates}
        usd={format(rates['UAH'] / rates['USD'])}
        eur={format(rates['UAH'] / rates['EUR'])}
        pln={format(rates['UAH'] / rates['PLN'])}
      />
      <h1 className='field__title'>Currency converter</h1>
      <div>
        <CurrencyInput
          amount={amountFirst}
          currency={currencyFirst}
          currencies={Object.keys(rates).filter(cur => cur === 'UAH' || cur === 'USD'
            || cur === 'EUR' || cur === 'PLN'
          )}
          onAmountChange={amoutnFirstChange}
          onCurrencyChange={currencyFirstChange}
        />
        <CurrencyInput
          amount={amountSecond}
          currency={currencySecond}
          currencies={Object.keys(rates).filter(cur => cur === 'UAH' || cur === 'USD'
            || cur === 'EUR' || cur === 'PLN'
          )}
          onAmountChange={amoutnSecondChange}
          onCurrencyChange={currencySecondChange}
        />
      </div>
    </>
  )
};

export default Converter