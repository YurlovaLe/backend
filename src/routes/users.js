const router = require('express').Router();

const { getUsers, getUser, createUser, updateUser, deleteteUser } = require('../controllers/users')

router.get('/users', getUsers);
router.get('/users/:user_id', getUser);
router.post('/users', createUser);
router.patch('/users/:user_id', updateUser);
router.delete('/users/:user_id', deleteteUser);

module.exports = router;