import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Estados para la paginación
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/transactions', {
                    params: {
                        page,
                        pageSize
                    }
                });
                setTransactions(response.data.transactions);
                setTotal(response.data.total);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactions();
    }, [page, pageSize]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/transactions/${id}`)
            .then(() => {
                setTransactions(transactions.filter(transaction => transaction.id !== id));
            })
            .catch(error => console.error(error));
    };

    const handleViewDetails = (id) => {
        axios.get(`http://localhost:3000/transactions/${id}`)
            .then(response => {
                setSelectedTransaction(response.data);
                setIsModalOpen(true);
            })
            .catch(error => console.error(error));
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    // Manejo de la paginación
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="container mx-auto mt-5 px-4">
            <h2 className="text-4xl font-bold mt-10 mb-10 text-center">Transaction List</h2>
            <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 inline-block hover:bg-blue-600 mr-6">Add New Transaction</Link>
            <Link to="/summary" className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 inline-block hover:bg-blue-600 mr-6">Get Summary</Link>
            <Link to="/by-category" className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 inline-block hover:bg-blue-600 mr-6">Get By Category</Link>
            <Link to="/by-date" className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 inline-block hover:bg-blue-600 mr-6">Get By Date</Link>
            <Link to="/categories" className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 inline-block hover:bg-blue-600">Get Categories</Link>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="py-2 px-4 text-center text-gray-600">Date</th>
                            <th className="py-2 px-4 text-center text-gray-600">Category</th>
                            <th className="py-2 px-4 text-center text-gray-600">Amount</th>
                            <th className="py-2 px-4 text-center text-gray-600">Type</th>
                            <th className="py-2 px-4 text-center text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 text-center">{transaction.date}</td>
                                <td className="py-2 px-4 text-center">{transaction.category}</td>
                                <td className="py-2 px-4 text-center">${transaction.amount}</td>
                                <td className="py-2 px-4 text-center">{transaction.type}</td>
                                <td className="py-2 px-4 text-center">
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleDelete(transaction.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg flex-1 hover:bg-red-600">Delete</button>
                                        <Link to={`/edit/${transaction.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex-1 hover:bg-yellow-600">Edit</Link>
                                        <button onClick={() => handleViewDetails(transaction.id)} className="bg-blue-500 text-white px-3 py-1 rounded-lg flex-1 hover:bg-blue-600">View</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Controles de Paginación */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
                    disabled={page === 1}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))}
                    disabled={page === totalPages}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && selectedTransaction && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-bold mb-4">Transaction Details</h3>
                        <p><strong>Date:</strong> {selectedTransaction.date}</p>
                        <p><strong>Category:</strong> {selectedTransaction.category}</p>
                        <p><strong>Amount:</strong> ${selectedTransaction.amount}</p>
                        <p><strong>Type:</strong> {selectedTransaction.type}</p>
                        <p><strong>Description:</strong> {selectedTransaction.description}</p>
                        <button onClick={closeModal} className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionList;
