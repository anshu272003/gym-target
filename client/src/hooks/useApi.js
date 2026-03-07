import { useState, useEffect, useCallback } from 'react';

export function useApi(apiCall, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiCall();
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, setData, refetch: fetchData };
}

export default useApi;
