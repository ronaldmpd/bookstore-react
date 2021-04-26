import useFetchClient from '../../shared/hooks/useFetchClient';
import ClientItem from './ClientItem';

const Client = () => {
  const [clientList, loading] = useFetchClient('Client', 'GET');

  console.log("clientList", clientList);

  return (
    <div className="Client">
      <h1>Lista de Clients</h1>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="">
          {clientList.clients.map((item) => (
            // eslint-disable-next-line no-underscore-dangle
            <ClientItem key={item._id} client={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Client;
