import React, { useState } from 'react';
import './Form.css';

function Form({ addTransaction }) {
  // Set initial state using useState hooks
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const transaction = { date, description, category, amount };
    // Send a POST request to the server with transaction data
    fetch('http://localhost:5000/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    })
    // Parse the response as JSON and pass the data to addTransaction function
    .then(response => response.json())
    .then(data => addTransaction(data))
    .catch(error => console.log(error));
    // Clear input fields after successful submission
    setDate('');
    setDescription('');
    setCategory('');
    setAmount('');
  };

  // Render form with input fields and submit button
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="date">Date</label>
        <input className="form-input" type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="description">Category</label>
        <input className="form-input" type="text" id="description" value={description} onChange={(event) => setDescription(event.target.value)} required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="category">Description</label>
        <input className="form-input" type="text" id="category" value={category} onChange={(event) => setCategory(event.target.value)} required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="amount">Amount</label>
        <input className="form-input" type="number" id="amount" value={amount} onChange={(event) => setAmount(event.target.value)} required />
      </div>
      <button className="form-button" type="submit">Add Transaction</button>
    </form>
  );
}

// Export Form component
export default Form;