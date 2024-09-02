import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TransactionListByCategory = () => {
    const [categories, setCategories] = useState('');
    const [transactions, setTransactions] = useState([]);

    const fetchTransactionsByCategories = async (categories) => {
        try {
            const response = await axios.get('http://localhost:3000/transactions/by-category', {
                params: { categories } // Enviar el parámetro correctamente
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            return [];
        }
    };

    const handleFetchTransactions = async () => {
        const data = await fetchTransactionsByCategories(categories);
        setTransactions(data);
    };

    const handleCategoryChange = (event) => {
        setCategories(event.target.value);
    };

    return (
        <div className='p-5'>
            <Link className="bg-blue-500 text-white text-xl px-4 py-2 rounded-lg inline hover:bg-blue-600" to="/">Back</Link>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-6">Filter Transactions by Category</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Categories (comma separated):</label>
                    <input
                        type="text"
                        value={categories}
                        onChange={handleCategoryChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <button
                    onClick={handleFetchTransactions}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Search
                </button>

                <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Transactions:</h3>
                    {transactions.length === 0 ? (
                        <p className="text-gray-600">No transactions found.</p>
                    ) : (
                        <ul className="space-y-2">
                            {transactions.map(transaction => (
                                <li key={transaction.id} className="p-4 bg-gray-100 rounded-md shadow-sm">
                                    <p className="text-gray-800"><strong>Category:</strong> {transaction.category}</p>
                                    <p className="text-gray-800"><strong>Amount:</strong> ${transaction.amount}</p>
                                    <p className="text-gray-800"><strong>Date:</strong> {transaction.date}</p>
                                    <p className="text-gray-800"><strong>Description:</strong> {transaction.description}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionListByCategory;
