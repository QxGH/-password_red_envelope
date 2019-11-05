import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
import store from '@/store/index';


var instance = axios.create(
  {
    timeout: 1000 * 20
  }
);

if(process.env.NODE_ENV == 'development') {
  // production
  axios.defaults.baseURL = '/api/'
};

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("password_red_envelope_token");
    if (token) {
      config.headers.Authorization = token
    };
    return config;
  },
  error => Promise.error(error)
);

instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    if (error) {
      Toast.fail({
        message: "请求错误",                        
        duration: 1500,
        forbidClick: true
      });
      return Promise.reject(error);
    } else {
      store.commit('changeNetwork', false);
    }
  }
);

export default instance;