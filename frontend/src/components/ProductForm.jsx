import { useMemo, useState } from 'react';

export default function ProductForm({
  initialValues,
  submitLabel = 'Save',
  loading,
  onSubmit,
}) {
  const init = useMemo(
    () => ({
      name: initialValues?.name ?? '',
      price:
        initialValues?.price === 0 || initialValues?.price
          ? String(initialValues.price)
          : '',
      image: initialValues?.image ?? '',
    }),
    [initialValues],
  );

  const [values, setValues] = useState(init);
  const [touched, setTouched] = useState({});

  const errors = {
    name: values.name.trim() ? null : 'Name is required',
    price:
      values.price === ''
        ? 'Price is required'
        : Number.isFinite(Number(values.price))
          ? null
          : 'Price must be a number',
    image: values.image.trim() ? null : 'Image URL is required',
  };

  const hasErrors = Boolean(errors.name || errors.price || errors.image);

  function setField(key, next) {
    setValues((v) => ({ ...v, [key]: next }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, price: true, image: true });
    if (hasErrors) return;

    const payload = {
      name: values.name.trim(),
      price: Number(values.price),
      image: values.image.trim(),
    };

    await onSubmit?.(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Name
        </label>
        <input
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="e.g. iPhone 15"
        />
        {touched.name && errors.name ? (
          <p className="mt-1 text-sm text-rose-600">{errors.name}</p>
        ) : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Price
        </label>
        <input
          value={values.price}
          onChange={(e) => setField('price', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, price: true }))}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="e.g. 999.99"
          inputMode="decimal"
        />
        {touched.price && errors.price ? (
          <p className="mt-1 text-sm text-rose-600">{errors.price}</p>
        ) : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Image URL
        </label>
        <input
          value={values.image}
          onChange={(e) => setField('image', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, image: true }))}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="https://..."
        />
        {touched.image && errors.image ? (
          <p className="mt-1 text-sm text-rose-600">{errors.image}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? 'Working…' : submitLabel}
        </button>
        {values.image ? (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="hidden sm:inline">Preview:</span>
            <img
              src={values.image}
              alt="Preview"
              className="h-10 w-10 rounded-md object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ) : null}
      </div>
    </form>
  );
}

