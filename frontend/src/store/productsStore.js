import { create } from 'zustand';
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from '../api/products';

function normalizeError(err) {
  return (
    err?.response?.data?.message ||
    err?.message ||
    'Something went wrong'
  );
}

export const useProductsStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,

  load: async () => {
    set({ loading: true, error: null });
    try {
      const json = await fetchProducts();
      set({ items: json?.data ?? [], loading: false });
    } catch (e) {
      set({ error: normalizeError(e), loading: false });
    }
  },

  add: async (payload) => {
    set({ loading: true, error: null });
    try {
      const json = await createProduct(payload);
      const created = json?.data;
      set({ items: created ? [created, ...get().items] : get().items, loading: false });
      return { ok: true, data: created };
    } catch (e) {
      const msg = normalizeError(e);
      set({ error: msg, loading: false });
      return { ok: false, message: msg };
    }
  },

  update: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const json = await updateProduct(id, payload);
      const updated = json?.data;
      set({
        items: get().items.map((p) => (p?._id === id ? updated : p)),
        loading: false,
      });
      return { ok: true, data: updated };
    } catch (e) {
      const msg = normalizeError(e);
      set({ error: msg, loading: false });
      return { ok: false, message: msg };
    }
  },

  remove: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteProduct(id);
      set({ items: get().items.filter((p) => p?._id !== id), loading: false });
      return { ok: true };
    } catch (e) {
      const msg = normalizeError(e);
      set({ error: msg, loading: false });
      return { ok: false, message: msg };
    }
  },
}));

