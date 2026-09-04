const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('bhoomi_token');
  const headers = { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch {
    throw new Error('Unable to connect to the server. Please try again.');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = Array.isArray(data.detail) ? data.detail[0]?.msg : data.detail;
    throw new Error(detail || 'The server could not complete this request.');
  }

  return data;
}

export function clearAuth() {
  localStorage.removeItem('bhoomi_token');
  localStorage.removeItem('bhoomi_user');
}
