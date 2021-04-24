import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

import BookService from '../../services/BookService';
import FileUploader from '../../shared/components/FileUploader';

const CreateBook = () => {
  const history = useHistory();
  const [book, setBook] = useState({ title: '', description: '', price: '', state: true });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOnChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnFileSubmit = (file) => {
    setBook({
      ...book,
      img: `${uuidv4()}-${file.name}`,
    });
    setSelectedImage(file);
  };

  const cleanBook = () => {
    setBook({ title: '', description: '', price: '', state: true });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await BookService.addBook(book, selectedImage);
    // eslint-disable-next-line no-console
    console.log(response);
    cleanBook();
    history.push('/');
  };

  return (
    <div className="CreateUser">
      <h1>Create New Book</h1>
      <Form onSubmit={handleOnSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Ingrese su Title"
            onChange={handleOnChange}
            value={book.title}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="Ingrese su Descripcion"
            onChange={handleOnChange}
            value={book.description}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">price</Label>
          <Input
            type="text"
            name="price"
            id="price"
            placeholder="Ingrese su price"
            onChange={handleOnChange}
            value={book.price}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">authorId</Label>
          <Input
            type="authorId"
            name="authorId"
            id="authorId"
            placeholder="Ingrese su authorId"
            onChange={handleOnChange}
            value={book.authorId}
          />
        </FormGroup>
        
        <FileUploader
          onFileSelectError={({ error }) => console.log(error)}
          onFileSelectSuccess={(file) => handleOnFileSubmit(file)}
        />
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default CreateBook;
