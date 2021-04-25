// const Author = () => {

//     return (
//       <div className="Author">
//         <h1>List of Authors</h1>     
//       </div>
//     );
// };

// export default Author;
import useFetchAuthor from '../../shared/hooks/useFetchAuthor';
import AuthorItem from './AuthorItem';

const Author = () => {
const [authorList, loading] = useFetchAuthor('Author', 'GET'); 

console.log("clientList", authorList);

  return (
    <div className="Author">
      <h1>List of Authors</h1>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="">
          {authorList.authors.map((item) => (                        
            // eslint-disable-next-line no-underscore-dangle
            <AuthorItem key={item._id} author={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Author;