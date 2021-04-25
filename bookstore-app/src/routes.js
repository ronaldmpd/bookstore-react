import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import Error404 from './components/Error/404';
import Book from './components/Book/Book';
import CreateBook from './components/Book/CreateBook';
import BookDetail from './components/Book/BookDetail';

import Author from './components/Author/Author';
import CreateAuthor from './components/Author/CreateAuthor';
import Client from './components/Client/Client';
import CreateClient from './components/Client/CreateClient';


const AppRoutes = () => (
  <App>
    <Switch>
      <Route path="/" component={Book} exact />
      <Route path="/books" component={Book} exact />
      <Route path="/books/create" component={CreateBook} exact />
      <Route path="/books/:id" component={BookDetail} exact />
      <Route path="/authors" component={Author} exact />
      <Route path="/authors/create" component={CreateAuthor} exact />
      <Route path="/clients" component={Client} exact />
      <Route path="/clients/create" component={CreateClient} exact />
      <Route component={Error404} />
    </Switch>
  </App>
);

export default AppRoutes;
