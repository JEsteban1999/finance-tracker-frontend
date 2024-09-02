import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TransactionSummary = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [summary, setSummary] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:3000/transactions/summary', {
                params: {
                    startDate,
                    endDate
                }
            });
            setSummary(response.data);
        } catch (error) {
            console.error('Error fetching summary:', error);
        }
    };

    return (
        <div className='p-6'>
            <Link className="bg-blue-500 text-white text-xl px-4 py-2 rounded-lg inline hover:bg-blue-600" to="/">Back</Link>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 mt-6 text-center">Transaction Summary</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Get Summary
                    </button>
                </form>

                {summary && (
                    <div className="mt-8 p-4 bg-gray-100 rounded-md">
                        <h3 className="text-lg font-medium text-gray-700">Summary</h3>
                        <p className="mt-2 text-gray-600"><strong>Total Income:</strong> ${summary.totalIncome.toFixed(2)}</p>
                        <p className="mt-2 text-gray-600"><strong>Total Expenses:</strong> ${summary.totalExpenses.toFixed(2)}</p>
                        <p className="mt-2 text-gray-600"><strong>Net Balance:</strong> ${summary.netBalance.toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionSummary;