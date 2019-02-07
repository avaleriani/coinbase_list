import { useState, useEffect } from 'react';

const useFetchAPI = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async() => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await fetch(url);
      const jsonResponse = await result.json();
      setData(jsonResponse);
    } catch(error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const doGet = (url) => {
    setUrl(url);
  };

  return { data, isLoading, isError, doGet };
};

export default useFetchAPI;