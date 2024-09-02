import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditTransaction = () => {
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/transactions/${id}`)
            .then(response => setTransaction(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/transactions/${id}`, transaction)
            .then(() => navigate('/'))
            .catch(error => console.error(error));
    };

    if (!transaction) return <div>Loading...</div>;

    return (
        <div className="container mx-auto mt-2 px-4 py-2">
            <Link className="bg-blue-500 text-white text-xl px-4 py-2 rounded-lg inline hover:bg-blue-600" to="/">Back</Link>
            <h2 className="text-2xl font-bold mb-2 text-center">Edit Transaction</h2>
            <form onSubmit={handleUpdate} className="border bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
                <div className='mb-4'>
                    <label className="block text-gray-700">Type</label>
                    <select value={transaction.type} onChange={(e) => setTransaction({ ...transaction, type: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full">
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700">Amount</label>
                    <input type="number" value={transaction.amount} onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full" required />
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700">Category</label>
                    <input type="text" value={transaction.category} onChange={(e) => setTransaction({ ...transaction, category: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full" required />
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700">Date</label>
                    <input type="date" value={transaction.date} onChange={(e) => setTransaction({ ...transaction, date: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full" required />
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700">Description</label>
                    <textarea value={transaction.description} onChange={(e) => setTransaction({ ...transaction, description: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full text-xl">Update</button>
            </form>
        </div>
    );
};

export default EditTransaction;