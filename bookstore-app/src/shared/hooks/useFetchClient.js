import { useState, useEffect } from 'react';
import ClientService from '../../services/ClientService';

export default function useFetchClient(api, method, body = null) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let service;
  if (api === 'Client') {
    service = ClientService;
  }

  const fetchURL = async () => {
    let response;
    if (method === 'GET') {
      response = await service.getClients(0, 20); // hardcode
    }
    if (method === 'POST') {
      response = await service.addClient(body);
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
