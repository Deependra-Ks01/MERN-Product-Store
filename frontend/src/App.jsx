import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductsPage from './pages/ProductsPage';
import { useEffect } from 'react';
import { useProductsStore } from './store/productsStore';

export default function App() {
  const load = useProductsStore((s) => s.load);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-full bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/new" element={<CreateProductPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/products/:id/edit" element={<EditProductPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
