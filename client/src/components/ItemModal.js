import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { addItem } from '../actions/itemActions';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

function ItemModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onChange = (e) => setInput(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem({ id: uuid(), name: input }));
    setInput('');
    toggle();
  };

  return (
    <div>
      <Button onClick={toggle} color="dark">
        Toggle Modal
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Noodles</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="new_item">New Item</Label>
              <Input
                type="text"
                name="name"
                id="new_item"
                value={input}
                placeholder="Add shopping item"
                onChange={onChange}
              />
              <Button type="submit" color="dark" style={{ marginTop: '1em' }}>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ItemModal;
