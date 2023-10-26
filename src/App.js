import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    const [rate, setRate] = useState(null);
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [currencies, setCurrencies] = useState({});
    const [convertedAmount, setConvertedAmount] = useState(null);

    useEffect(() => {
        const apiKey = "6e54173bfb6faff2a307b9a54775fa196788ec3b";
        axios.get(`https://api.getgeoapi.com/v2/currency/list?api_key=${apiKey}&format=json`)
            .then(response => {
                const currencyData = response.data.currencies;
                setCurrencies(currencyData);
            })
            .catch(error => {
                console.error('Error fetching currency data:', error)
            });
    }, []);

    useEffect(() => {
        if(fromCurrency === toCurrency) {
            setRate(1)
        } else {
            const apiKey = "6e54173bfb6faff2a307b9a54775fa196788ec3b";
            axios.get(`https://api.getgeoapi.com/v2/currency/convert?api_key=${apiKey}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}&format=json`)
                .then(response => {
                    setRate(response.data.rates[toCurrency].rate);
                })
                .catch(error => {
                    console.error('Error fetching currency rate:', error)
                });
        }
    }, [fromCurrency, toCurrency, amount]);

    function handleAmount(event) {
        event.preventDefault();
        setAmount(event.target.value);
    }

    function convertCurrency() {
        if (rate !== null) {
            const validAmount = parseFloat(amount);
            if (!isNaN(validAmount)) {
                const convertAmount = (validAmount * rate).toFixed(2);
                setConvertedAmount(convertAmount);
            }
        }
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
                                className="form-control"
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
                                className="form-select"
                                id="from-currency"
                                value={fromCurrency}
                                onChange={e => setFromCurrency(e.target.value)}
                            >
                                {Object.keys(currencies).map(currency => (
                                    <option key={currency} value={currency}>
                                        {currency} - {currencies[currency]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group form-group-warning">
                            <select
                                className="form-select"
                                id="to-currency"
                                value={toCurrency}
                                onChange={e => setToCurrency(e.target.value)}
                            >
                                {Object.keys(currencies).map(currency => (
                                    <option key={currency} value={currency}>
                                        {currency} - {currencies[currency]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={convertCurrency}
                        >
                            Convert
                        </button>
                    </div>
                    <div className="col-6">
                        <p>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;
