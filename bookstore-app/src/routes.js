import { Route, Switch } from 'react-router-dom';

import App from './components/App';
// import Home from './components/Home';
// import Pomodoro from './components/Pomodoro/Pomodoro';
// import Numbers from './components/Numbers/Numbers';
// import Calculator from './components/Calculator/Calculator';
// import Chart from './components/Chart';
import Error404 from './components/Error/404';
// import Todo from './components/Todo/Todo';
// import Login from './components/Login';
// import Create from './components/Create';
// import AppHook from './components/AppHook/AppHook';
// import CalculatorHook from './components/Calculator/CalculatorHook';
// import User from './components/User/User';
// import CreateUser from './components/CreateUser/CreateUser';
import Book from './components/Book/Book';
import CreateBook from './components/Book/CreateBook';
import Author from './components/Author/Author';


const AppRoutes = () => (
  <App>
    <Switch>
      <Route path="/" component={Book} exact />
      <Route path="/books" component={Book} exact />
      <Route path="/books/create" component={CreateBook} exact />
      <Route path="/authors" component={Author} exact />
      {/* <Route path="/pomodoro" component={Pomodoro} exact />
      <Route path="/numbers" component={Numbers} exact />
      <Route path="/calculator" component={Calculator} exact />
      <Route path="/calculatorhook" component={CalculatorHook} exact />
      <Route path="/chart" component={Chart} exact />
      <Route path="/todo" component={Todo} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/create" component={Create} exact />
      <Route path="/hooks" component={AppHook} exact />
      <Route path="/users" component={User} exact />
      <Route path="/users/create" component={CreateUser} exact /> */}
      <Route component={Error404} />
    </Switch>
  </App>
);

export default AppRoutes;
