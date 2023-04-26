import { useState, useEffect } from 'react';
import './App.css';
import Form from './Form';
import './Form.css';
function App() {
  // Declare state variables for transactions and search term
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // UseEffect hook to fetch transaction data from the server
  useEffect(() => {
    fetch('http://localhost:5000/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.log(error));
  }, []);
  // Function to add a new transaction to the state
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };
  // Filter the transactions array based on the search term
  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Return the JSX code for the application
  return (
    <div className="App">
      {/* Search bar to filter the transactions */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Description"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </div>
      {/* Display the transactions in a table */}
      
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
           <th>Category</th>
           <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render the form component to add a new transaction */}
      <Form addTransaction={addTransaction} />
    </div>
  );
}
export default App;