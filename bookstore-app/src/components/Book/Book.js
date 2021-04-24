// const Book = () => {

//   return (
//     <div className="Book">
//       <h1>List of Books</h1>     
//     </div>
//   );
// };

// export default Book;

// import { useState, useEffect } from 'react';
// import UserService from '../../services/UserService';
import useFetch from '../../shared/hooks/useFetch';
import BookItem from './BookItem';

const Book = () => {
  const [bookList, loading] = useFetch('Book', 'GET');
  // const [userList, setUserList] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await UserService.getUsers();
  //     setUserList(response.data.rows);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [loading]);

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
