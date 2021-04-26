import useFetch from '../../shared/hooks/useFetch';
import BookItem from './BookItem';

const Book = () => {
  const [bookList, loading] = useFetch('Book', 'GET');

  return (
    <div className="Book">
      <h1>Lista de Books</h1>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="">
          {bookList.books.map((item) => (
            // eslint-disable-next-line no-underscore-dangle
            <BookItem key={item._id} book={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Book;
