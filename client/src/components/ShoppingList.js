import React, { useState, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../actions/itemActions';

import ItemModal from './ItemModal';

function ShoppingList(props) {
  const { items } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  const onAddClick = () => {
    const name = prompt('Enter Item');
    if (name) {
      dispatch(addItem({ id: uuid(), name }));
    }
  };

  const onDeleteClick = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <Container>
      <ItemModal />
      <Button
        color="dark"
        style={{ marginBottom: '3rem' }}
        onClick={onAddClick}
      >
        Add Item
      </Button>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={250} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => onDeleteClick(id)}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

export default ShoppingList;
