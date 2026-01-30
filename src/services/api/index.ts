import { Config } from "@/configs";
import { POST_REFRESH_TOKEN_REQUEST } from "@/constants/api-endpoints";
import { AuthVerificationResponse } from "@/types/http";
import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeUserData,
  setAccessToken,
  setRefreshToken,
} from "../secure-storage";
import { HttpHeaders } from "./typings";

export const api = axios.create({ baseURL: Config.apiBaseURL });

api.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  const contentAccessToken = Config.contentAccessKey;
  console.log("[TOKEN]:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (contentAccessToken) {
    config.headers["x-authorization"] = contentAccessToken;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // console.log("[Interceptor]: Response -> Error", error.response);
      const refresh = getRefreshToken();
      console.log("[Refreshing Keys]:", refresh);
      try {
        const { data: response } = await axios.post<AuthVerificationResponse>(
          POST_REFRESH_TOKEN_REQUEST,
          {
            refresh,
          },
        );
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        error.config.headers.Authorization = `Bearer ${response.data.access}`;
        return api(error.config);
      } catch (refreshErr) {
        console.log("[Refresh Token Error]:", refreshErr);
        removeUserData();
      }
    }

    console.log("[API]:", error);

    return Promise.reject(error);
  },
);

export const getHeaders = async (
  sendSdkToken: boolean,
): Promise<HttpHeaders> => {
  const token = getAccessToken();

  const headers: Partial<HttpHeaders> = {
    ...(token && { authorization: `Bearer ${token}` }),
    "x-authorization": Config.contentAccessKey,
  };

  return headers as HttpHeaders;
};
