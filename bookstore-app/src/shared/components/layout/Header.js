import { useState } from 'react';

import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
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
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Books
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/books">Books</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/books/create">Create Book</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Authors
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/authors">Authors</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/authors/create">Create Author</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Clients
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/clients">Clients</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/clients/create">Create Client</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/">Carrito</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
