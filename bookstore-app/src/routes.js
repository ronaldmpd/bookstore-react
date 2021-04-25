import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import Error404 from './components/Error/404';
import Book from './components/Book/Book';
import CreateBook from './components/Book/CreateBook';
import Author from './components/Author/Author';
import Client from './components/Client/Client';


const AppRoutes = () => (
  <App>
    <Switch>
      <Route path="/" component={Book} exact />
      <Route path="/books" component={Book} exact />
      <Route path="/books/create" component={CreateBook} exact />
      <Route path="/authors" component={Author} exact />
      <Route path="/clients" component={Client} exact />
      <Route component={Error404} />
    </Switch>
  </App>
);

export default AppRoutes;
