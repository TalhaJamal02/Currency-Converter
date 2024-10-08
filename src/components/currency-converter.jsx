import React from 'react';
import useCurrencyConverter from '../hooks/useCurrencyConverter';

const CurrencyConverter = () => {
  const {
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
  } = useCurrencyConverter();

  const handleSwap = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
  };

  return (
    <div className="w-full mx-auto shadow-xl rounded-xl p-8 mt-10 bg-gray-300">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">Currency Converter</h2>

      {error && (
        <div className="text-red-500 p-2 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-black mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-lg text-black"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="block text-gray-300text-black mb-2">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full p-2 border rounded-lg text-black"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={handleSwap}
            className="py-[5px] px-[15px] -mb-8 bg-gray-300"
            title="Swap currencies"
          >
            ⇄
          </button>
        </div>

        <div className="w-1/2">
          <label className="block text-black mb-2">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full p-2 border rounded-lg text-black"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={convertCurrency}
        className="w-full bg-blue-500 text-black font-medium py-2 rounded-xl hover:bg-blue-500"
        disabled={loading}
      >
        {loading ? 'Converting...' : 'Convert'}
      </button>

      {result && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-black">Converted Amount:</h3>
          <p className="text-2xl font-bold text-black">{result} {toCurrency}</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
