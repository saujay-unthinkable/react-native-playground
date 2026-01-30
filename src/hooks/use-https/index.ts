import { useCallback, useEffect, useState } from "react";

import { api, getHeaders } from "@/services/api";
import {
  HttpHooksError,
  HttpHooksOptions,
  HttpHooksResponse,
  HttpResponse,
} from "@/types/http";
import { AxiosError } from "axios";

// const handleErrors = (response: any): HttpHooksError => {
//   const status = response.status || 500;
//   const errKind = get(response, "data.kind", "")?.split("/");
//   const errCode = errKind?.[0] === "api" ? errKind?.[1] : "";
//   const errMsg = errCode
//     ? t(`errors.${errCode}.label`)
//     : get(response, "data.message", "");

//   if (status === 404) {
//     return {
//       errMsg: errMsg || "404 page not found",
//       errResponse: response,
//     };
//   } else if (status >= 400 && status < 500) {
//     return { errMsg, errResponse: response };
//   } else {
//     return {
//       errMsg: errMsg || "Error!!! Something went wrong",
//       errResponse: response,
//     };
//   }
// };

interface HttpsResponse {
  data?: any;
  message?: string;
  code: number;
}

const defaultOptions = {
  lazy: false,
  sendSdkToken: false,
};

const useQuery = <T>(
  path: string,
  options: HttpHooksOptions,
): HttpHooksResponse<T> => {
  const { params, lazy } = { ...defaultOptions, ...options };

  const [data, setData] = useState<HttpResponse<T>>();
  const [ok, setOk] = useState<boolean | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorDetails, setErrorDetails] = useState<HttpHooksError | null>(null);

  const execute = useCallback(
    async (paramsOnExecute?: any, pathOnExecute?: any) => {
      setLoading(true);
      setOk(null);
      setErrorDetails(null);
      setError("");
      setData(undefined);

      const response = await api.get<HttpResponse<T>>(pathOnExecute || path, {
        params: paramsOnExecute || params,
      });

      if (!response.data) {
        // const errDetails = handleErrors(response);

        // setErrorDetails(errDetails);
        // setError(errDetails?.errMsg);
        setLoading(false);
        setData(response.data);
        // setOk(response.ok);

        return;
      }

      setData(response.data);
      // setOk(response.ok);
      setErrorDetails(null);
      setError("");
      setLoading(false);
      return response.data;
    },
    [],
  );

  useEffect(() => {
    if (!lazy) {
      execute();
    }
  }, [lazy, execute]);

  return {
    loading,
    data,
    execute,
    error,
    errorDetails,
    ok,
  };
};

const useGet = <T>(
  path: string,
  options?: HttpHooksOptions,
): HttpHooksResponse<T> => {
  return useQuery<T>(path, { ...options });
};

const useMutation = <T>(
  path: string,
  method: "post" | "put" | "patch" | "delete",
  options?: HttpHooksOptions,
): HttpHooksResponse<T> => {
  const { payload, lazy, sendSdkToken } = { ...defaultOptions, ...options };

  const [data, setData] = useState<HttpResponse<T>>();
  const [ok, setOk] = useState<boolean | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorDetails, setErrorDetails] = useState<HttpHooksError | null>(null);

  const execute = useCallback(
    async (payloadOnExecute?: any, pathOnExecute?: any) => {
      // console.log("[API Call]:", pathOnExecute || path);
      setLoading(true);
      setOk(undefined);
      setErrorDetails(null);
      setError("");
      setData(undefined);

      const headers = await getHeaders(sendSdkToken);

      console.log("[Requesting]::Start");
      try {
        const response = await api[method]<HttpResponse<T>>(
          pathOnExecute || path,
          payloadOnExecute || payload || {},
          {
            headers,
          },
        );
        // console.log("[Requesting]::End");

        if (!response.data) {
          // const errDetails = handleErrors(response);
          // setErrorDetails(errDetails);
          // setError(errDetails?.errMsg);
          // setOk(response.ok);
          setLoading(false);
          setData(response.data);
          return;
        }

        setData(response.data);
        // setOk(response.ok);
        setErrorDetails(null);
        setError("");
        setLoading(false);
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        const response = err?.response?.data as HttpsResponse;
        console.log("[Error]:", err?.message, err?.response);
        setData(response?.data);
        setError(response?.message || "");
        setLoading(false);
        return;
      }
    },
    [],
  );

  useEffect(() => {
    if (!lazy) {
      execute();
    }
  }, [lazy, execute]);

  return {
    loading,
    data,
    execute,
    error,
    errorDetails,
    ok,
  };
};

const usePut = <T>(
  path: string,
  options?: HttpHooksOptions,
): HttpHooksResponse<T> => {
  return useMutation<T>(path, "put", options);
};

const usePatch = <T>(
  path: string,
  options?: HttpHooksOptions,
): HttpHooksResponse<T> => {
  return useMutation<T>(path, "patch", options);
};

const usePost = <T>(
  path: string,
  options?: HttpHooksOptions,
): HttpHooksResponse<T> => {
  return useMutation<T>(path, "post", options);
};

const useDelete = <T>(
  path: string,
  options?: HttpHooksOptions,
): HttpHooksResponse<T> => {
  return useMutation<T>(path, "delete", options);
};

export { useDelete, useGet, usePatch, usePost, usePut };
