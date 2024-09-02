import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EditTransaction from './pages/EditTransaction';
import TransactionForm from './components/TransactionForm';
import TransactionSummary from './components/TransactionSummary';
import TransactionListByCategory from './components/TransactionListByCategory';
import TransactionListByDate from './components/TransactionListByDate';
import CategoryList from './components/CategoryList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditTransaction />} />
        <Route path="/add" element={<TransactionForm />} />
        <Route path="/summary" element={<TransactionSummary />} />
        <Route path="/by-category" element={<TransactionListByCategory />} />
        <Route path="/by-date" element={<TransactionListByDate />} />
        <Route path="/categories" element={<CategoryList />} />
      </Routes>
    </Router>
  );
};

export default App;
