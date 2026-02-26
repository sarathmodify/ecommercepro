import axios from 'axios';

// ------------------------------------------------------------------
// Axios instance configured for fake.jsonmockapi.com
// ------------------------------------------------------------------
const apiClient = axios.create({
    baseURL: 'https://fake.jsonmockapi.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ------------------------------------------------------------------
// Request Interceptor — attach any auth headers here in future
// ------------------------------------------------------------------
apiClient.interceptors.request.use(
    (config) => {
        // e.g. config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ------------------------------------------------------------------
// Response Interceptor — centralized error handling
// ------------------------------------------------------------------
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Network error (no response from server)
        if (!error.response) {
            console.error('[API] Network error:', error.message);
            return Promise.reject(new Error('Network error. Please check your connection.'));
        }

        // HTTP error responses
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;

        switch (status) {
            case 400:
                console.error('[API] Bad Request:', message);
                break;
            case 404:
                console.error('[API] Not Found:', message);
                break;
            case 500:
                console.error('[API] Server Error:', message);
                break;
            default:
                console.error(`[API] Error ${status}:`, message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
