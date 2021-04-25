import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

import AuthorService from '../../services/AuthorService';

const CreateAuthor = () => {
  const history = useHistory();
  const [author, setAuthor] = useState({ name: '', age: null, nationality: '' });

  const handleOnChange = (e) => {
    setAuthor({
      ...author,
      [e.target.name]: e.target.value,
    });
  };
  
  const cleanAuthor = () => {
    setAuthor({ name: '', age: null, nationality: '' });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await AuthorService.addAuthor(author);
    // eslint-disable-next-line no-console
    console.log(response);
    cleanAuthor();
    history.push('/authors');
  };

  return (
    <div className="CreateAuthor">
      <h1>Create New Author</h1>
      <Form onSubmit={handleOnSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Ingrese su name"
            onChange={handleOnChange}
            value={author.name}
          />
        </FormGroup>    
        <FormGroup>
          <Label for="age">age</Label>
          <Input
            type="text"
            name="age"
            id="age"
            placeholder="Ingrese su age"
            onChange={handleOnChange}
            value={author.age}
          />
        </FormGroup>
        <FormGroup>
          <Label for="nationality">nationality</Label>
          <Input
            type="name"
            name="nationality"
            id="nationality"
            placeholder="Ingrese su nationality"
            onChange={handleOnChange}
            value={author.nationality}
          />
        </FormGroup>                         
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default CreateAuthor;
