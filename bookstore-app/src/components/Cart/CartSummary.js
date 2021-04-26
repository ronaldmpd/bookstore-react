import { object } from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle, Button, CardLink } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import useFetchDetailBook from '../../shared/hooks/useFetchDetailBook';


const CartSummary = () => {
  const history = useHistory();
  const { id } = useParams();
  const [book, loading] = useFetchDetailBook(id, 'GET'); 

  return (
    <div className="CartSummary">
      <h1>Order Summary</h1>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="">
         <Card >
      <CardImg  src={book.img || 'https://picsum.photos/200/300'} alt={book.title} height="300px" />
      <CardBody>
        <CardTitle>
        Title: {book.title}
        </CardTitle>
        <CardSubtitle>Author: {book.author.name} - {book.description} - {book.price} Bs. - </CardSubtitle>        
        <CardSubtitle>Sub Total: {book.price} Bs. - </CardSubtitle>
        <CardSubtitle>Order Total: {book.price} Bs. - </CardSubtitle>        
        <CardLink href={`/cart/buynowbook/${book.id}`}>Continue Buy</CardLink>
      </CardBody>
    </Card>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
