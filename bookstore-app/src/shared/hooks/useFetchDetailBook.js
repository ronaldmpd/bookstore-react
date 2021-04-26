import { useState, useEffect } from 'react';
import BookService from '../../services/BookService';
import AuthorService from '../../services/AuthorService';

export default function useFetchDetailBook(bookId, method) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchURL = async () => {
    let response;
    if (method === 'GET') {
      const book = await BookService.getBookById(bookId);
      const author = await AuthorService.getAuthorById(book.data.authorId);
      let url;
      if (book.data.img) url = await BookService.getURLImage(book.data.img);
      book.data.img = url;
      book.data.author = author;

      console.log('>>>>> useFetchDetailBook - book with author: ', book);
      response = book.data;
    }
    if (response.error) {
      setError(response.error);
    }
    console.log('27 - useFetchDetailBook - ', response);
    setData(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchURL();
  }, []);
  return [data, loading, error];
}
