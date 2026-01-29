export interface HttpHooksError {
  errMsg: string;
  errResponse: any;
}

export interface HttpHooksResponse<T> {
  loading: boolean;
  data?: T;
  execute: (args?: unknown, url?: string) => Promise<T | undefined>;
  error: string;
  errorDetails: HttpHooksError | null;
  ok?: boolean;
}

export interface HttpHooksOptions {
  payload?: unknown;
  params?: object;
  lazy?: boolean;
  sendSdkToken?: boolean;
  arrayFormat?: "indices" | "brackets" | "repeat" | "comma" | undefined;
}

interface AuthData {
  access: string;
  refresh: string;
}
export interface AuthVerificationResponse {
  data: AuthData;
}
