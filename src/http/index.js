import axios from 'axios';
import { Toast } from 'vant';
import store from '@/store/index';


let instance = axios.create({
  timeout: 1000 * 20
});

if(process.env.NODE_ENV == 'development') {
  // production 代理
  instance.defaults.baseURL = '/api/'
};

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

instance.interceptors.request.use(
  config => {
    let xc_pwd_red_envelope = JSON.parse(localStorage.getItem("xc_pwd_red_envelope"));
    if (xc_pwd_red_envelope) {
      config.headers.Authorization = xc_pwd_red_envelope.token
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
        message: "服务器错误！",                        
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