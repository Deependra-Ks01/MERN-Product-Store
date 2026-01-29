import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useProductsStore } from '../store/productsStore';

export default function CreateProductPage() {
  const navigate = useNavigate();
  const { loading, error, add } = useProductsStore();

  async function onSubmit(payload) {
    const res = await add(payload);
    if (res.ok) navigate('/');
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Add product
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Create a new product in your catalog.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Back
        </button>
      </div>

      {error ? (
        <div className="mt-6 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      ) : null}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProductForm
          submitLabel="Create"
          loading={loading}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

