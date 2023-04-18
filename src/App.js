import React, { useState, useEffect } from "react";
import axios  from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    const[rate, setRate] = useState(null);
    const[amount, setAmount] = useState('');
    const[fromCurrency, setFromCurrency] = useState('USD');
    const[toCurrency, setToCurrency] = useState('EUR');
    const[currencies,  setCurrencies]  = useState([]);

    useEffect(() => {
        const apiId = "cef2c05ca3e3492482ad7c6a4971176f";
        axios.get(`https://openexchangerates.org/api/latest.json?app_id=${apiId}&base=USD`)
            .then(response => {
                setRate(response.data.rates);
                setCurrencies(Object.keys(response.data.rates));
            })
    }, []);

    function handleAmount(event) {
        event.preventDefault();
        setAmount(event.target.value);
    }

    function convertCurrency() {

    }

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <h2>Check live foreign currency exchange rates</h2>
      <div className="container">
        <div className="row row-of-labels">
          <div className="col-4">
            <label htmlFor="amount">Amount</label>
          </div>
          <div className="col-4">
            <label htmlFor="from-currency">From</label>
          </div>
          <div className="col-4">
            <label htmlFor="to-currency">To</label>
          </div>
        </div>
        <div className="row">
            <div className="col-4">
                <div className="form-group form-group-warning">
                    <input
                        type="text"
                        className="amount"
                        id="amount"
                        value={amount}
                        onChange={handleAmount}
                        required="required"
                    />
                </div>
            </div>
            <div className="col-4">
                <div className="form-group form-group-warning">
                    <select
                        className="from-currency"
                        id="from-curensy"
                        value={fromCurrency}
                        onChange={e => setFromCurrency(e.target.value)}
                    >
                        {currencies.map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="col-4">
                <div className="form-group form-group-warning">
                    <select
                        className="to-currency"
                        id="to-curensy"
                        value={toCurrency}
                        onChange={e => setToCurrency(e.target.value)}
                    >
                        {currencies.map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
          <button
              type="button"
              className="btn btn-primary"
              onClick={convertCurrency}
          >
              Convert
          </button>
      </div>
    </div>
  );
}

export default App;
