import { useState, useEffect } from 'react';
import axios from 'axios';

const useCurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch available currencies when the component mounts
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        const currencyKeys = Object.keys(response.data.rates);
        setCurrencies(currencyKeys);
      })
      .catch(() => setError('Failed to load currencies'));
  }, []);

  const convertCurrency = () => {
    setLoading(true);
    setError('');

    axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
        const rate = response.data.rates[toCurrency];
        setResult((amount * rate).toFixed(2));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to perform conversion');
        setLoading(false);
      });
  };

  return {
    currencies,
    fromCurrency,
    toCurrency,
    amount,
    result,
    loading,
    error,
    setFromCurrency,
    setToCurrency,
    setAmount,
    convertCurrency,
  };
};

export default useCurrencyConverter;
