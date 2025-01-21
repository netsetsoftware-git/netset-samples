import axios from 'axios';

const userClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const notificationClient = axios.create({
  baseURL: import.meta.env.VITE_NOTIFICATION_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { userClient, notificationClient };
