import { useParams } from "react-router-dom";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";

import useFetchBuyNowBook from "../../shared/hooks/useFetchBuyNowBook";

const BuyNowBook = () => {
  const { id } = useParams();
  const [cart, loading] = useFetchBuyNowBook(id, "POST");

  return (
    <div className="BuyNowBook">
      <h1>Complete Buy Book</h1>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="">
          <Card>
            <CardImg
              src={cart.book.img || "https://picsum.photos/200/300"}
              alt={cart.book.title}
              height="300px"
            />
            <CardBody>
              <CardTitle>Title: {cart.book.title}</CardTitle>
              <CardSubtitle>
                {" "}
                {cart.book.description} - {cart.book.price} Bs. -{" "}
              </CardSubtitle>
              <CardSubtitle>Complete Buy </CardSubtitle>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BuyNowBook;
