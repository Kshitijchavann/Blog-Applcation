import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      console.log('API Response:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Data:', data);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [data, loading, error]);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      console.log('API Response (Refetch):', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error refetching data from API:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch };
};

export default useFetch;
