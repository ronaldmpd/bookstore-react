const BookRepository = require('../repositories/BookRepository');

const getBooks = async (from, limit, filters, attributes) => {
  let defaultFilters = {
    state: true,
  };
    if (!filters) {
      filters = defaultFilters;
    } else {
      filters = { ...defaultFilters, ...filters };
    }
    const { count, rows } = await BookRepository.getBooks(from, limit, filters, attributes);
    return  { count, books: rows };;
  };
  
  const getBookById = async (id) => {
    return await BookRepository.getBookById(id);
  };

const addBook = async (book) => {
    return await BookRepository.addBook(book);
};

const updateBook = async ({
    bookId,
    title,
    description,
    price,
    authorId,
    img
  }) => {
    const book = await BookRepository.updateBook({
      bookId,
      title,
      description,
      price,
      authorId,      
      img,
    });
    return book;
  };

  const deleteBook = async (id) => {
    const book = await BookRepository.deleteBook(id);
    return book;
  };

module.exports = {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};
