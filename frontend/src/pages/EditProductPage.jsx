import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useProductsStore } from '../store/productsStore';

export default function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { items, loading, error, update } = useProductsStore();

  const product = useMemo(() => items.find((p) => p?._id === id), [items, id]);

  async function onSubmit(payload) {
    const res = await update(id, payload);
    if (res.ok) navigate('/');
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Edit product</h1>
          <p className="mt-1 text-sm text-slate-600">
            Update the product fields and save.
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

      {!product ? (
        <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Product not found in store. Go back to Products and refresh.
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      ) : null}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProductForm
          initialValues={product}
          submitLabel="Save changes"
          loading={loading}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

