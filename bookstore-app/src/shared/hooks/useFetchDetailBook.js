import { useState, useEffect } from 'react';
import BookService from '../../services/BookService';
import AuthorService from '../../services/AuthorService';

// useFetch('Books', 'GET');
export default function useFetchDetailBook(bookId, method) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let service;
  //if (api === 'Book') {
  service = BookService;


  const fetchURL = async () => {
    let response;
    if (method === 'GET') {
      let book = await BookService.getBookById(bookId);  
      let author = await AuthorService.getAuthorById(book.data.authorId);
          
      //let books = await service.getBooks(0, 20); // hardcode
      book.data.author = author;  

      
      console.log(">>>>> useFetchDetailBook - book with author: ", book);      
      response = book.data;
    }
    // if (method === 'POST') {
    //   response = await service.addBook(body);
    // }
    if (response.error) {
      setError(response.error);
    }
    console.log("27 - useFetchDetailBook - ", response);
    setData(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchURL();
  }, []);
  return [data, loading, error];
}
