import { http } from './http';

export async function fetchProducts() {
  const res = await http.get('/api/products');
  return res.data;
}

export async function createProduct(payload) {
  const res = await http.post('/api/products', payload);
  return res.data;
}

export async function updateProduct(id, payload) {
  const res = await http.put(`/api/products/${id}`, payload);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await http.delete(`/api/products/${id}`);
  return res.data;
}

