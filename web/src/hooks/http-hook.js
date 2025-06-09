import { useState, useCallback } from "react";
import { toast } from "react-toastify";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendReq = useCallback(async (path, method = "GET", body, headers = defaultHeaders) => {
    setIsLoading(true);
    const httpAbortController = new AbortController();
    try {
      // eslint-disable-next-line no-undef
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
        method,
        headers,
        body,
        signal: httpAbortController.signal,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      if (method === "POST" || method === "PUT") {
        toast.success("Success!");
      }
      setIsLoading(false);
      return responseData;
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong!");
      setError(err.message);
      setIsLoading(false);
      return err;
    }
  }, []);

  function clearError() {
    setError(null);
  }

  return { isLoading, error, sendReq, clearError };
}
