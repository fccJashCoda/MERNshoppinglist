import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { useSelector } from 'react-redux';

function AppNavbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar color="dark" dark expend="sm" className="mb-5">
      <Container>
        <NavbarBrand href="/">ShoppingList</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuthenticated ? (
              <>
                <NavItem>
                  <RegisterModal />
                </NavItem>
                <NavItem>
                  <LoginModal />
                </NavItem>
              </>
            ) : (
              <NavItem>
                <Logout />
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
