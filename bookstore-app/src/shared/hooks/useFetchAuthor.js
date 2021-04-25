import { useState, useEffect } from 'react';
import AuthorService from '../../services/AuthorService';

export default function useFetchAuthor(api, method, body = null) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let service;
  if (api === 'Author') {
    service = AuthorService;
  }

  const fetchURL = async () => {
    let response;
    if (method === 'GET') {
      response = await service.getAuthors(0, 20); // hardcode
    }
    if (method === 'POST') {
      response = await service.addAuthor(body);
    }
    if (response.error) {
      setError(response.error);
    }

    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchURL();
  }, []);
  return [data, loading, error];
}
