import { object } from 'prop-types';
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from 'reactstrap';

const AuthorItem = ({ author }) => {
  return (
    <Card>
      <CardImg src={'https://picsum.photos/200/300'} alt={author.name} height="300px" />
      <CardBody>
        <CardTitle>
          {author.name}
        </CardTitle>
        <CardSubtitle>Age: {author.age} - Nationality: {author.nationality} </CardSubtitle>
      </CardBody>
    </Card>
  );
};

AuthorItem.propTypes = {
  author: object,
};

export default AuthorItem;
