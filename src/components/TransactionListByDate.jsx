import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TransactionListByDate = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    const handleFetchTransactions = async () => {
        if (!startDate || !endDate) {
            setError('Please select both start and end dates.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:3000/transactions/by-date', {
                params: { startDate, endDate }
            });
            setTransactions(response.data);
            setError(''); // Clear any previous error
        } catch (error) {
            console.error(error);
            setError('An error occurred while fetching the transactions.');
        }
    };

    return (
        <div className='p-6'>
            <Link className="bg-blue-500 text-white text-xl px-4 py-2 rounded-lg inline hover:bg-blue-600" to="/">Back</Link>
            <div className="container mx-auto mt-5 px-4 max-w-md">
                <h2 className="text-2xl font-bold mt-10 mb-10 text-center">Transactions by Date Range</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Start Date</label>
                    <input
                        type="date"
                        className="border p-2 rounded w-full"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">End Date</label>
                    <input
                        type="date"
                        className="border p-2 rounded w-full"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleFetchTransactions}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full">
                    Search
                </button>

                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
            <div className="overflow-x-auto mt-6 p-5">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead>
                            <tr className="border-b bg-gray-100">
                                <th className="py-2 px-4 text-center text-gray-600">Date</th>
                                <th className="py-2 px-4 text-center text-gray-600">Category</th>
                                <th className="py-2 px-4 text-center text-gray-600">Amount</th>
                                <th className="py-2 px-4 text-center text-gray-600">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4 text-center">{transaction.date}</td>
                                    <td className="py-2 px-4 text-center">{transaction.category}</td>
                                    <td className="py-2 px-4 text-center">${transaction.amount}</td>
                                    <td className="py-2 px-4 text-center">{transaction.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default TransactionListByDate;
