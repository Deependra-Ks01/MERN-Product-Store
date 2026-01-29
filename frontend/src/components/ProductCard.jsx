import { Link } from 'react-router-dom';

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[4/3] w-full bg-slate-100">
        {product?.image ? (
          <img
            src={product.image}
            alt={product?.name || 'Product'}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-slate-900">
              {product?.name}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              ${Number(product?.price ?? 0).toFixed(2)}
            </p>
          </div>
          <Link
            to={`/products/${product?._id}`}
            className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            View
          </Link>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(product)}
            className="flex-1 rounded-md bg-[#393E46] px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(product)}
            className="flex-1 rounded-md bg-[#8CE4FF] px-3 py-2 text-sm font-medium text-slate-900 hover:bg-[#6dd4f0]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

