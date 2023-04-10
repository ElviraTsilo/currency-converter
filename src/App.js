import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <h2>Check live foreign currency exchange rates</h2>
      <div className="container">
        <div className="row row-of-labels">
          <div className="col-4">
            <label htmlFor="amount" id="amount">Amount</label>
          </div>
          <div className="col-4">
            <label htmlFor="from" id="from">From</label>
          </div>
          <div className="col-4">
            <label htmlFor="to" id="to">To</label>
          </div>
        </div>
        <div className="row">
            <div className="col-4">
                <div className="form-group form-group-warning">
                    <input
                        type="text"
                        className="form-control"
                        id="amount"
                    />
                </div>
            </div>
            <div className="col-4">
                <div className="form-group form-group-warning">
                    <input
                        type="text"
                        className="form-control"
                        id="from-curensy"
                    />
                </div>
            </div>
            <div className="col-4">
                <div className="form-group form-group-warning">
                    <input
                        type="text"
                        className="form-control"
                        id="to-curensy"
                    />
                </div>
            </div>
        </div>
          <button
              type="button"
              className="btn btn-primary"
          >
              Convert
          </button>
      </div>
    </div>
  );
}

export default App;
