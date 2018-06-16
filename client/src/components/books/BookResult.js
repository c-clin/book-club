import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BookResultItem from './BookResultItem';

const BookResult = props => {
  console.log(props.books);
  let addBookBtn = props.auth.isAuthenticated ? (
    <button>Add Book</button>
  ) : null;

  const renderContent = props.books.bookList.map(book => {
    return (
      <div>
        <BookResultItem
          key={book.title}
          title={book.title}
          author={book.author}
          link={book.link}
          image={book.image}
        />
        {addBookBtn}
      </div>
    );
  });

  const errorMessage = (
    <p>
      You must <Link to="/login">log in</Link> to trade!
    </p>
  );

  return (
    <div>
      <h3>this is the book result component</h3>
      {props.auth.isAuthenticated ? null : errorMessage}
      {renderContent}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    books: state.books,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(BookResult);
