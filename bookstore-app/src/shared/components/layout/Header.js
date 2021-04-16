import { useState } from 'react';

import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavLink, NavItem } from 'reactstrap';
// import ThemeContext from '../../../context/ThemeContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme] = useState('dark');
  // const { theme } = useContext(ThemeContext);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <Navbar color={theme} dark={theme === 'dark'} light={theme === 'light'} expand="md">
        <NavbarBrand href="/">React BookStore</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/books">Books</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/authors">Authors</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href="/numbers">Numbers</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/calculator">Calculator</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/chart">Chart</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/todo">Todo</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/hooks">First Hook</NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
