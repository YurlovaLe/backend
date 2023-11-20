const User = require('../models/user');

const getUsers = (request, response) => {
  return User.find({})
    .then((users)=> {response.status(200).send(users);
    })
    .catch((error) => {response.status(500).send(error.message);
    });
};

const getUser = (request, response) => {
  const { user_id } = request.params;
  return User.findById(user_id)
    .then ((user) => {response.status(200).send(user)})
    .catch ((error) => {
      if (error.message.indexOf('Cast to ObjectId failed') === 0) {
        response.status(404).send('Wrong user id');
      } else {
      response.status(500).send(error.message);
      }
    });
};

const createUser = (request, response) => {
  return User.create({ ...request.body })
    .then((user) => {response.status(201).send(user)
    })
    .catch((error) => {
      if (error.message.indexOf('validation failed')) {
        response.status(404).response.send('Wrong user id');
      } else {
        response.status(500).send('something went wrong');
      }
    })
};

const updateUser = (request, response) => {
  const { user_id } = request.params;
  const data = request.body;
    return User.findByIdAndUpdate(user_id, data, { new: true, runValidators: true })
      .then(user => {response.status(200).send(user);
      })
      .catch((error) => {
        if (error.message.indexOf('Cast to ObjectId failed') === 0) {
          response.status(404).send('Wrong user id');
        } else if (error.message === 'Wrong request body') {
          response.status(404).send(error.message);
        } else {
          response.status(500).send(error.message);
        }
      })
};

const deleteteUser = (request, response) => {
  const { user_id } = request.params;
    return User.findByIdAndDelete(user_id)
      .then(user => {response.status(200).send("Done");
      })
      .catch((error) => {
        if (error.message.indexOf('validation failed')) {
          response.status(404).send('Wrong user id');
        } else {
          response.status(500).send('something went wrong');
        }
      })
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteteUser
}