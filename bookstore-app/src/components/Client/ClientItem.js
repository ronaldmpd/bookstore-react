import { object } from 'prop-types';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from 'reactstrap';
import ClientService from '../../services/ClientService';

const ClientItem = ({ client }) => {
  // const [urlImage, setUrlImage] = useState(null);
  // const [loading, setLoading] = useState(true);
    
  return (
    <Card>
      <CardImg src={'https://picsum.photos/200/300'} alt={client.name} height="300px" />
      <CardBody>
        <CardTitle>
          {client.name}
        </CardTitle>
        <CardSubtitle>Nit: {client.nit} </CardSubtitle>
      </CardBody>
    </Card>
  );
};

ClientItem.propTypes = {
  client: object,
};

export default ClientItem;
