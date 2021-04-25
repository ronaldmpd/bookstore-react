const Client = require('../models').Client;

const getClients = async (from, limit, filters, attributes) => {
    const data = await Client.findAndCountAll({
      limit,
      offset: from,
      where: filters,
      attributes,
    });
    return data;
  };
  
  const getClientById = async (id) => {
    return await Client.findOne({ where: { id } });
  };

const addClient = async ({name, nit, state}) =>{    
    const client = await Client.create({name, nit, state});
    return client;
}

const updateClient = async ({
    clientId,
    name,
    nit,
    state,    
  }) => {    
    const currentClient = await Client.findOne({ where: { id: clientId }});
    currentClient.name = name || currentClient.name;
    currentClient.nit = nit || currentClient.nit;    
    currentClient.state = state || currentClient.state;    
    const client = await currentClient.save();
    return client;
  };

  const deleteClient = async (id) => {
    const deleteState = {
      state: false,
    };
    const client = await Client.update(deleteState, { where: { id } });
    return client;
  };

module.exports = {
    getClients,
    getClientById,
    addClient,
    updateClient,
    deleteClient
};