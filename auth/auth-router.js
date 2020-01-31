const router = require('express').Router();
const bcrypt = require('bcryptjs');
const restrict = require('../middleware/restrict')
const Users = require('./auth-model');


router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/users', restrict, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(400).json({ message: 'no auth' });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.isUserLoggedIn = user
        res.status(200).json({
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(400).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({error: 'Server error'});
    });
});

module.exports = router;





