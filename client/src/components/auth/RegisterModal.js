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
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { useSelector, useDispatch } from 'react-redux';

function ItemModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const error = useSelector((state) => state.error);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.msg);
    } else {
      setMsg(null);
    }
  }, [error.id]);

  useEffect(() => {
    if (isOpen) toggle();
  }, [isAuthenticated]);

  const dispatch = useDispatch();

  const toggle = () => {
    setName('');
    setEmail('');
    setPassword('');
    dispatch(clearErrors());
    setIsOpen(!isOpen);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    // attempt to register
    dispatch(register(newUser));
  };

  return (
    <>
      <NavLink href="#" onClick={toggle}>
        Register
      </NavLink>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Noodles</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                style={{ marginBottom: '2em' }}
                onChange={(e) => setName(e.target.value)}
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                style={{ marginBottom: '2em' }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                style={{ marginBottom: '2em' }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                color="dark"
                style={{ marginTop: '1em' }}
                block
              >
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ItemModal;
