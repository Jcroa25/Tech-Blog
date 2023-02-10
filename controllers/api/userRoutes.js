const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  User.findAll({
      attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(error => {
      console.log(error);
      res.status(400).json(error);
    });
});
router.get('/:id', (req, res) => {
  User.findOne({
      attributes: { exclude: ['password']},
      where: {
        id: req.params.id
      },
      include: [
          {
            model: Post,
            attributes: ['id', 'title', 'post_content', 'created_at']
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
              model: Post,
              attributes: ['title']
            }
          }
        ]

  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json(error);
    });
});
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  });
});
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'Wrong email' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Wrong password' });
      return;
    }
    req.session.save(() => {
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.email = dbUserData.email;
    req.session.loggedIn = true;

    res.json({ user: dbUserData, message: 'Successful login' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
    res.status(204).end();
    });
  }
});

router.put('/:id', withAuth, (req, res) => {
  User.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(400).json({ message: 'Unable to find User' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json(error);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'Unable to find user' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json(error);
    });
});

module.exports = router;