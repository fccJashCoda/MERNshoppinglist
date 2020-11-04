import React from 'react';
import { logout } from '../../actions/authActions';
import { useDispatch } from 'react-redux';
import { NavLink } from 'reactstrap';

function Logout() {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <NavLink href="#" onClick={onClick}>
        Logout
      </NavLink>
    </>
  );
}

export default Logout;
