import { useState, useEffect } from 'react';
import BookService from '../../services/BookService';
import AuthorService from '../../services/AuthorService';

// useFetch('Books', 'GET');
export default function useFetch(api, method, body = null) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let service;
  if (api === 'Book') {
    service = BookService;
  }

  const fetchURL = async () => {
    let response;
    if (method === 'GET') {
      let authors = await AuthorService.getAuthors(0, 20);
      let authorById = {};
      for(let i in authors.data.authors){
        let author = authors.data.authors[i];        
        authorById[author.id] = author;
      }    
      let books = await service.getBooks(0, 20); // hardcode
      let dataResponse = {};
      dataResponse.data ={};
      dataResponse.data.count = books.count;
      let booksWithAuthor = [];
      for(let i in books.data.books){
        let book = books.data.books[i];
        book.author = authorById[book.authorId];        
        booksWithAuthor.push(book);
      }
      dataResponse.data.books = booksWithAuthor;
      console.log(">>>>> book with author: ", dataResponse);      
      response = dataResponse;
    }
    if (method === 'POST') {
      response = await service.addBook(body);
    }
    if (response.error) {
      setError(response.error);
    }
    console.log("27 - useFetch - ", response.data);
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchURL();
  }, []);
  return [data, loading, error];
}
