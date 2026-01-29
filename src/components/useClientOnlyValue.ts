// This function returns the client value for native platforms.
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  return client;
}
