import {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  AxiosInstance,
} from "axios";
import dotenv from "dotenv";
dotenv.config();

export default function Interceptor(api: AxiosInstance) {
  console.log('Aqui Bruno', api.interceptors.response);
  console.log('Variaveis', process.env);
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (!error.response) {
				console.log({error})
				// console.log(process.env.URL_FORTNITEAPI)
        return "Erro 18";
      }
      if (
        error.response?.status === 412 ||
        error.response?.headers["content-type"] === "text/csv"
      ) {
        return Promise.resolve({
          status: error.response.status,
          data: error.response.data,
        });
      }

      if (error.response?.status === 404) {
        return null;
      }

      if (error.response?.status) {
        return "Erro 35";
      }

      if (error.response?.data) {
        const { data } = error.response;

        if (data) {
          return "Erro 42";
        }
      }
      console.info(error.config);
      return Promise.reject(error);
    }
  );

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.headers) {
      config.headers.Authorization = process.env.TOKEN_FORTNITEAPI || "";
      return Promise.resolve(config);
    }
  });
}
