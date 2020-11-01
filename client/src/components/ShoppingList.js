import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';

import ItemModal from './ItemModal';

function ShoppingList(props) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item);
  const isLoading = useSelector((state) => state.item.loading);

  useEffect(() => {
    console.log('infintie loop checker');
    if (!items.length && !isLoading) {
      dispatch(getItems());
      console.log('items ', items);
    }
  }, []);

  console.log(items);
  const onDeleteClick = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <Container>
      <ItemModal />
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={250} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => onDeleteClick(_id)}
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
