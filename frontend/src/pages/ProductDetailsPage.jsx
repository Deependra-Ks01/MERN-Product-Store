import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProductsStore } from '../store/productsStore';

export default function ProductDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { items, remove } = useProductsStore();

  const product = useMemo(() => items.find((p) => p?._id === id), [items, id]);

  async function onDelete() {
    const ok = window.confirm(`Delete "${product?.name}"?`);
    if (!ok) return;
    await remove(id);
    navigate('/');
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-slate-700">Product not found.</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-semibold text-slate-900">
                {product.name}
              </h1>
              <p className="mt-2 text-lg font-medium text-slate-800">
                ${Number(product.price ?? 0).toFixed(2)}
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

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => navigate(`/products/${id}/edit`)}
              className="rounded-md bg-[#393E46] px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-md bg-[#8CE4FF] px-4 py-2 text-sm font-medium text-slate-900 hover:bg-[#6dd4f0]"
            >
              Delete
            </button>
          </div>

          <p className="mt-6 text-sm text-slate-600">
            This backend currently stores only <span className="font-medium">name</span>,{' '}
            <span className="font-medium">price</span>, and <span className="font-medium">image</span>.
            If you add description/categories later, we can expand this page.
          </p>
        </div>
      </div>
    </div>
  );
}

