import { useEffect, useState } from "react";

// Fetches from the API; keeps the local fallback data if the server is offline
export default function useFetch(fetcher, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetcher()
      .then((d) => alive && Array.isArray(d) && d.length && setData(d))
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return { data, loading };
}
