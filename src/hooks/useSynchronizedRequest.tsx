import { useRef, useState } from "react";

export function useSynchronizedRequest<RequestDataType, ResponseType>(
  executeRequest: (data?: RequestDataType) => Promise<ResponseType | undefined>
): [
  ResponseType | undefined,
  (data?: RequestDataType) => Promise<ResponseType | undefined>
] {
  const networkIds = useRef({ latestRequest: 0, responseInState: 0 });
  const [synchronizedResponse, setSynchronizedResponse] =
    useState<ResponseType>();
  function executeSynchronizedRequest(
    data?: RequestDataType
  ): Promise<ResponseType | undefined> {
    const requestId = ++networkIds.current.latestRequest;
    return new Promise((resolve) => {
      executeRequest(data).then((response) => {
        if (requestId >= networkIds.current.responseInState) {
          setSynchronizedResponse(response);
          networkIds.current.responseInState = requestId;
        }
        resolve(response);
      });
    });
  }
  return [synchronizedResponse, executeSynchronizedRequest];
}
