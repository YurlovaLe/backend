const Book = require('../models/book');

const getBooks = (request, response) => {
  return Book.find({})
    .then((books)=> {response.status(200).send(books);
    })
    .catch((error) => {response.status(500).send(error.message);
    });
};

const getBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findById(book_id)
    .then ((book) => {response.status(200).send(book)})
    .catch ((error) => {
      if (error.message.indexOf('Cast to ObjectId failed') === 0) {
        response.status(404).send('Wrong book id');
      } else {
        response.status(500).send(error.message);
      }
    });
};

const createBook = (request, response) => {
  return Book.create({ ...request.body })
    .then((book) => {response.status(201).send(book)
    })
    .catch((error) => {
      if (error.message.indexOf('validation failed')) {
        response.status(404).send('Wrong book id');
      } else {
        response.status(500).send(error.message);
      }
    })
};

const updateBook = (request, response) => {
  const { book_id } = request.params;
  const data = request.body;
    return Book.findByIdAndUpdate(book_id, { ...data })
    .then((book) => {
      if (Object.keys(data).length === 0) {
        throw new Error('Wrong request body');
      }
      response.status(200).send(book);
    })
    .catch((error) => {
      if (error.message.indexOf('Cast to ObjectId failed') === 0) {
        response.status(404).send('Wrong book id');
      } else if (error.message === 'Wrong request body') {
        response.status(404).send(error.message);
      } else {
        response.status(500).send(error.message);
      }
    });
};

const deleteteBook = (request, response) => {
  const { book_id } = request.params;
    return Book.findByIdAndDelete(book_id)
      .then(() => {response.status(200).send("Done");
      })
      .catch((error) => {
        if (error.message.indexOf('validation failed')) {
          response.status(404).send('Wrong book id');
        } else {
          response.status(500).send('something went wrong');
        }
      })
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteteBook
}