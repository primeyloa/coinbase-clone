const API_BASE_URL = 'http://localhost:5000/api'; // I will have to my deployed backend URL

interface ApiResponse<T> {
  data?: T;
  message?: string;
}

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(errorData.message || 'API request failed', response.status);
  }

  return response.json();
}

export const api = {
  auth: {
    register: (data: { name: string; email: string; password: string }) =>
      apiRequest<{ _id: string; name: string; email: string; token: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    login: (data: { email: string; password: string }) =>
      apiRequest<{ _id: string; name: string; email: string; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    getProfile: () =>
      apiRequest<{ _id: string; name: string; email: string }>('/auth/profile'),
  },

  crypto: {
    getAll: () =>
      apiRequest<Array<{
        _id: string;
        name: string;
        symbol: string;
        price: number;
        image: string;
        change24h: number;
        createdAt: string;
      }>>('/crypto'),

    getGainers: () =>
      apiRequest<Array<{
        _id: string;
        name: string;
        symbol: string;
        price: number;
        image: string;
        change24h: number;
        createdAt: string;
      }>>('/crypto/gainers'),

    getNew: () =>
      apiRequest<Array<{
        _id: string;
        name: string;
        symbol: string;
        price: number;
        image: string;
        change24h: number;
        createdAt: string;
      }>>('/crypto/new'),

    add: (data: { name: string; symbol: string; price: number; image: string; change24h: number }) =>
      apiRequest<{
        _id: string;
        name: string;
        symbol: string;
        price: number;
        image: string;
        change24h: number;
        createdAt: string;
      }>('/crypto', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
};

export { ApiError };