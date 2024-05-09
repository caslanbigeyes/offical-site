import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? 'https://xiaoluo-dev.xiaoluoapp.com'
    : 'https://xiaoluoapp.com',
  timeout: 10000
});

instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  if (response.data.success) {
    message.success(response.data.msg)
  }
  return response.data;
}, function (error) {
  if (error && error.response) {
    switch (error.response.status) {
      case 500:
        message.error(error.response.data.msg)

    }
  }
  return Promise.reject(error);
});

export default instance
