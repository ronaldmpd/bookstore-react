import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

import ClientService from '../../services/ClientService';

const CreateClient = () => {
  const history = useHistory();
  const [client, setBook] = useState({ name: '', nit: null, state: true });

  const handleOnChange = (e) => {
    setBook({
      ...client,
      [e.target.name]: e.target.value,
    });
  };
  
  const cleanClient = () => {
    setBook({ name: '', nit: null, state: true });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await ClientService.addClient(client);
    // eslint-disable-next-line no-console
    console.log(response);
    cleanClient();
    history.push('/clients');
  };

  return (
    <div className="CreateUser">
      <h1>Create New Book</h1>
      <Form onSubmit={handleOnSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="name"
            name="name"
            id="name"
            placeholder="Ingrese su name"
            onChange={handleOnChange}
            value={client.name}
          />
        </FormGroup>    
        <FormGroup>
          <Label for="nit">nit</Label>
          <Input
            type="text"
            name="nit"
            id="nit"
            placeholder="Ingrese su nit"
            onChange={handleOnChange}
            value={client.nit}
          />
        </FormGroup>                        
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default CreateClient;
