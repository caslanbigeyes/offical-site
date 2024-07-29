import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? 'https://www.bincial.com/api/'
    : 'https://www.bincial.com/api/',
  timeout: 10000,
});

instance.interceptors.request.use(function (config) {
  const language = config.Language; // 这里可以根据实际情况动态设置语言
  if (!config.headers) {
    config.headers = {};
  }
  config.headers['language'] = language;
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  if (error && error.response) {
    switch (error.response.status) {
      case 500:
        message.error('Server error, please try again later')
        break;
    }
  }
  return Promise.reject(error);
});

export default instance
