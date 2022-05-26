import { useCallback, useState } from 'react';

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (
      {
        url,
        method = 'GET',
        body = null,
        headers = {
          'Content-Type': 'application/json',
        },
      },
      applyData
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const responce = await fetch(url, {
          method: method,
          body: body ? JSON.stringify(body) : body,
          headers: headers,
        });

        if (!responce.ok) {
          throw new Error(responce.statusText);
        }

        const data = await responce.json();

        applyData(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
}
