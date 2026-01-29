import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProductsStore } from '../store/productsStore';

export default function ProductsPage() {
  const navigate = useNavigate();
  const { items, loading, error, remove } = useProductsStore();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => (p?.name || '').toLowerCase().includes(q));
  }, [items, query]);

  async function onDelete(product) {
    const ok = window.confirm(`Delete "${product?.name}"?`);
    if (!ok) return;
    await remove(product?._id);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-600">
            Browse your catalog and manage items.
          </p>
        </div>

        <div className="flex w-full gap-2 sm:w-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 sm:w-72"
          />
          <button
            type="button"
            onClick={() => navigate('/products/new')}
            className="shrink-0 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Add
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-8 text-sm text-slate-600">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-slate-700">No products found.</p>
          <button
            type="button"
            onClick={() => navigate('/products/new')}
            className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Create your first product
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard
              key={p?._id}
              product={p}
              onEdit={() => navigate(`/products/${p?._id}/edit`)}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

