import React from 'react';

const BookResultItem = props => {
  return (
    <div style={{ width: '400px' }}>
      <h4>{props.title}</h4>
      <p>{props.author}</p>
      <p>{props.link}</p>
      <img src={props.image} alt={props.title} />
    </div>
  );
};

export default BookResultItem;
