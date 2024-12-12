import axios from "axios";
import CONST from "./services/const.js";
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

let isRefreshing = false;
let failedQueue = [];
let hasShownToast = false; // Cờ để kiểm soát việc hiển thị toast

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const timeout = CONST.REQUEST.TIME_OUT;
let AxiosClient = axios.create({
  baseURL: CONST.URL.API,
  timeout,
  headers: {
    "Content-Type": "application/json",
    "client-guid": "66acdac032f435bf45ccb6a2"
  },
});
let AxiosClientKWT = axios.create({
  baseURL: `${CONST.URL.API}/kwt`,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

const registerInterceptorsRequest = (clientInstance) => {
  clientInstance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
registerInterceptorsRequest(AxiosClient);
registerInterceptorsRequest(AxiosClientKWT);

const registerInterceptorResponse = (clientInstance) => {
  clientInstance.interceptors.response.use(
    async (response) => {
      return response.data || response;
    },
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        if (!hasShownToast) {
          toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
          hasShownToast = true; 
        }

        localStorage.clear();
        
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000); 

        return;
      }

      return Promise.reject(error);
    }
  );
};

registerInterceptorResponse(AxiosClient);
registerInterceptorResponse(AxiosClientKWT);

const setConfigAxiosClient = (accessToken, clientAxiosInstance) => {
  clientAxiosInstance.defaults.headers.common = {
    "Content-Type": "application/json",
    Authorization: "",
  };
  clientAxiosInstance.defaults.timeout = timeout;
  if (accessToken) {
    clientAxiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
};

export function setConfigAxios(accessToken) {
  setConfigAxiosClient(accessToken, AxiosClient);
  setConfigAxiosClient(accessToken, AxiosClientKWT);
}

const post = (url, data, config = {}) => {
  return AxiosClient.post(url, data, config);
};

const get = (url, data, config = {}) => {
  return AxiosClient.get(url, data, config);
};

const put = (url, data, config = {}) => {
  return AxiosClient.put(url, data, config);
};

const patch = (url, data, config = {}) => {
  return AxiosClient.patch(url, data, config);
};

const del = (url, config = {}) => {
  return AxiosClient.delete(url, config);
};

const postWithCustomHeader = (url, data, customHeaders) => {
  const config = {
    headers: {
      ...AxiosClient.defaults.headers.common,
      ...customHeaders,
    },
  };
  return AxiosClient.post(url, data, config);
};
const SysFetch = {
  post,
  get,
  put,
  patch,
  delete: del,
  postWithCustomHeader,
};

const SysFetchKWT = {
  post: (url, data, config = {}) => {
    return AxiosClientKWT.post(url, data, config);
  },
  get: (url, config = {}) => {
    return AxiosClientKWT.get(url, config);
  },
  put: (url, data, config = {}) => {
    return AxiosClientKWT.put(url, data, config);
  },
  patch: (url, data, config = {}) => {
    return AxiosClientKWT.put(url, data, config);
  },
  delete: (url, config = {}) => {
    return AxiosClientKWT.delete(url, config);
  },
  postWithCustomHeader: (url, data, customHeaders) => {
    const config = {
      headers: {
        ...AxiosClientKWT.defaults.headers.common,
        ...customHeaders,
      },
    };
    return AxiosClientKWT.post(url, data, config);
  },
};

export { SysFetchKWT };
export default SysFetch;
