const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

export const api = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  products: (params='') => request(`/products${params}`),
  product: (id) => request(`/products/${id}`),
  order: (body, token) => request('/orders', { method:'POST', body:JSON.stringify(body), headers:{ Authorization:`Bearer ${token}` } }),
  myOrders: (token) => request('/orders/my', { headers:{ Authorization:`Bearer ${token}` } })
};
