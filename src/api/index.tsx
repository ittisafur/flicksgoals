import axios, { AxiosError, AxiosResponse } from 'axios';

const BaseRequest = axios.create({
  baseURL: process.env.NEXT_CONFIG_BASE_URL_API,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
})


BaseRequest.interceptors.response.use(
    function (response: AxiosResponse) {
        return response;
    },
    function (error: AxiosError) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error.toJSON());
        }

        return Promise.reject({
            code: error.response?.status,
            message: (error.response?.data as any)?.message ?? 'Unknown Error',
        });
    }
);
