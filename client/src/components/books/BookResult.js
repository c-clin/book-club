import React from 'react';
import { connect } from 'react-redux';
import BookResultItem from './BookResultItem';

const BookResult = props => {
  console.log(props.books);

  const renderContent = props.books.bookList.map(book => {
    return (
      <BookResultItem
        key={book.title}
        title={book.title}
        author={book.author}
        link={book.link}
        image={book.image}
      />
    );
  });

  return (
    <div>
      <h3>this is the book result component</h3>
      {renderContent}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

export default connect(mapStateToProps)(BookResult);
