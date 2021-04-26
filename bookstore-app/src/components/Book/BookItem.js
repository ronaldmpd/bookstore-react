import { object } from 'prop-types';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardLink, } from 'reactstrap';
import BookService from '../../services/BookService';

const BookItem = ({ book }) => {
  const [urlImage, setUrlImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = await BookService.getURLImage(book.img);
      setUrlImage(url);
      setLoading(false);
    };
    fetchData();
  }, [loading, book]);

  return (
    <Card>
      <CardImg src={urlImage || 'https://picsum.photos/200/300'} alt={book.title} height="300px" />
      <CardBody>
        <CardLink href={`/books/${book.id}`}> Title: {book.title}</CardLink>
        <CardSubtitle>Author: {book.author.name} - {book.description} - {book.price} Bs. - </CardSubtitle>
      </CardBody>
    </Card>
  );
};

BookItem.propTypes = {
  book: object,
};

export default BookItem;
