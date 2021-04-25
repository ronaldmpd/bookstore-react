// import { object } from 'prop-types';
// import { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";
// import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from 'reactstrap';
// import BookService from '../../services/BookService';

// const BookDetail = () => {

//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [urlImage, setUrlImage] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     console.log("start");
//     const fetchData = async () => {      
//       console.log("BookDetail id:", id);
//       const book = await BookService.getBookById(id);        
//       console.log("BookDetail book:", book);
//       setBook(book);

//       const url = await BookService.getURLImage(book.img);
//       setUrlImage(url);
//       setLoading(false);
//     };
//     fetchData();
//   }, [loading]);

//   return (
//     <Card>
//       <CardImg src={urlImage || 'https://picsum.photos/200/300'} alt={book.title} height="300px" />
//       <CardBody>
//         <CardTitle>
//           {book.title} {' '}
//         </CardTitle>
//         <CardSubtitle>Author: {book.author.name} - {book.description} - {book.price} Bs. - </CardSubtitle>
//       </CardBody>
//     </Card>
//   );
// };

// BookDetail.propTypes = {
//   book: object,
// };

// export default BookDetail;




const BookDetail = () => (<div className="BookDetail">Book Detail</div>);

export default BookDetail;