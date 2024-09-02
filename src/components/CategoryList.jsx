import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    // Función para consumir el endpoint y obtener las categorías
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/transactions/categories');
            setCategories(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Usar useEffect para llamar a la función fetchCategories cuando el componente se monte
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto mt-5 px-4">
            <Link className="bg-blue-500 text-white text-xl px-4 py-2 rounded-lg inline hover:bg-blue-600" to="/">Back</Link>
            <h2 className="text-2xl font-bold mb-4 text-center">Available Categories</h2>
            <ul className="bg-white shadow-md rounded-lg p-4">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <li key={index} className="py-2 px-4 border-b last:border-none">
                            {category}
                        </li>
                    ))
                ) : (
                    <li className="text-center py-4">No categories available</li>
                )}
            </ul>
        </div>
    );
};

export default CategoryList;
