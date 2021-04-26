import { useState, useEffect } from 'react';
import BookService from '../../services/BookService';
import CartService from '../../services/CartService';
import CartDetailService from '../../services/CartDetailService';

export default function useFetchBuyNowBook(bookId, method) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchURL = async () => {
    let response;
    if (method === 'POST') {
      const book = await BookService.getBookById(bookId);
      let url;
      if (book.data.img) url = await BookService.getURLImage(book.data.img);
      book.data.img = url;

      const cart = await CartService.addCart({ clientId: 1, total: book.data.price, status: true });
      // eslint-disable-next-line camelcase
      const cart_detail = await CartDetailService.addCartDetail({
        cartId: cart.data.id,
        bookId,
        quantity: 1,
        amount: book.data.price,
      });
      // eslint-disable-next-line camelcase
      cart.data.cart_detail = cart_detail;
      cart.data.book = book.data;
      console.log('>>>>> useFetchBuyNowBook - cart.data.cart_detail ', cart);
      response = cart.data;
    }
    if (response.error) {
      setError(response.error);
    }
    console.log('27 - useFetchBuyNowBook - ', response);
    setData(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchURL();
  }, []);
  return [data, loading, error];
}
