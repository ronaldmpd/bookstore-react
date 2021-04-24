import { useState, useEffect } from 'react';
import BookService from '../../services/BookService';

// useFetch('Users', 'GET');
export default function useFetch(api, method, body = null) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let service;
  if (api === 'Book') {
    service = BookService;
  }

  const fetchURL = async () => {
    let response;
    if (method === 'GET') {
        

      response = await service.getBooks(0, 20); // hardcode
    }
    if (method === 'POST') {
      response = await service.addBook(body);
    }
    if (response.error) {
      setError(response.error);
    }

    console.log("27 - useFetch - ", response.data);
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchURL();
  }, []);
  return [data, loading, error];
}
