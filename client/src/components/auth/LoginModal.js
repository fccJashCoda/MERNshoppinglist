import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { login } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';

function LoginModal() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const error = useSelector((state) => state.error);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg);
    } else {
      setMsg(null);
    }
  }, [error.id]);

  useEffect(() => {
    if (isOpen) toggle();
  }, [isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  const toggle = () => {
    setEmail('');
    setPassword('');
    dispatch(clearErrors());
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: '2em' }}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '2em' }}
              />
            </FormGroup>
            <Button type="submit" block>
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default LoginModal;
