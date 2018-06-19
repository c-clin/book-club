import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BookResultItem from './BookResultItem';
import * as actions from '../../store/actions';
import '../../css/BookItemContainer.css';

const BookResult = props => {
  console.log(props.books);
  // let addBookBtn = props.auth.isAuthenticated ? (
  //   <button onClick={props.onAddBook(...props)}>Add Book</button>
  // ) : null;

  const renderContent = props.books.searchList.map(book => {
    return (
      <div>
        <BookResultItem
          key={book.title}
          title={book.title}
          author={book.author}
          link={book.link}
          apiID={book.apiID}
          image={book.image}
        />
      </div>
    );
  });

  const errorMessage = (
    <p className="welcome-message" style={{ fontSize: '17px' }}>
      You must <Link to="/login">log in</Link> to trade!
    </p>
  );

  let bookResultContent;
  if (props.books.loading === true) {
    bookResultContent = (
      <div
        className="preloader-wrapper big active"
        style={{ position: 'absolute', left: '50%', top: '45%' }}
      >
        <div className="spinner-layer spinner-green-only">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    );
  } else {
    bookResultContent = (
      <div>
        {props.auth.isAuthenticated ? null : errorMessage}
        <div className="BookItem-container"> {renderContent}</div>;
      </div>
    );
  }

  return <div>{bookResultContent}</div>;
};

const mapStateToProps = state => {
  return {
    books: state.books,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddBook: bookData => dispatch(actions.onAddBook(bookData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookResult);
