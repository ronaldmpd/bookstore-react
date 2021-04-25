const ClientRepository = require('../repositories/ClientRepository');

const getClients = async (from, limit, filters, attributes) => {
  let defaultFilters = {
    state: true,
  };
    if (!filters) {
      filters = defaultFilters;
    } else {
      filters = { ...defaultFilters, ...filters };
    }
    const { count, rows } = await ClientRepository.getClients(from, limit, filters, attributes);
    return { count, clients: rows };
  };
  
  const getClientById = async (id) => {
    return await ClientRepository.getClientById(id);
  };

const addClient = async (client) => {
    return await ClientRepository.addClient(client);
};

const updateClient = async ({
    clientId,
    name,
    nit,    
  }) => {
    const client = await ClientRepository.updateClient({
      clientId,
      name,
      nit,      
    });
    return client;
  };

  const deleteClient = async (id) => {
    const client = await ClientRepository.deleteClient(id);
    return client;
  };

module.exports = {
    getClients,
    getClientById,
    addClient,
    updateClient,
    deleteClient,
};
