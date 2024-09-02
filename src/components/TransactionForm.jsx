import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const TransactionForm = () => {
    const [type, setType] = useState('Income');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTransaction = { type, amount, category, date, description };

        axios.post('http://localhost:3000/transactions', newTransaction)
            .then(() => {
                navigate('/');
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mx-auto mt-2 px-4 py-2">
            <Link className="bg-blue-500 text-white text-xl px-4 py-2 rounded-lg inline hover:bg-blue-600" to="/">Back</Link>
            <h2 className="text-2xl font-bold mb-2 text-center">Add New Transaction</h2>
            <form onSubmit={handleSubmit} className="border bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
                <div className='mb-4'>
                    <label className="block text-gray-700">Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="border border-gray-300 rounded-lg p-2 w-full">
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700">Amount</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="border border-gray-300 rounded-lg p-2 w-full" required />
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700">Category</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-300 rounded-lg p-2 w-full" required />
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700">Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-gray-300 rounded-lg p-2 w-full" required />
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded-lg p-2 w-full h-20"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white text-xl px-4 py-2 rounded w-full">Submit</button>
            </form>
        </div>
    );
};

export default TransactionForm;

