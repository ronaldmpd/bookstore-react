import { object } from 'prop-types';
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from 'reactstrap';

const ClientItem = ({ client }) => {
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
