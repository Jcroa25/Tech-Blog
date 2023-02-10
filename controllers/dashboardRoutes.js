const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'post'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'email']
        }
      },
      {
        model: User,
        attributes: ['username', 'email']
      }
    ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => 
          post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      });
  });
  
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'post'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'email']
        }
      },
      {
        model: User,
        attributes: ['username', 'email']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Unable to find post' });
        return;
      }

const post = dbPostData.get({ plain: true });

res.render('editpost', {
    post,
    loggedIn: true
    });
})
.catch(error => {
console.log(error);
res.status(500).json(error);
});
});

router.get('/create/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'post',
      'created_at'
    ],
    include: [
    {
      model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'email']
        }
    },
        {
          model: User,
          attributes: ['username', 'email']
        }
        ]
    })
        .then(dbPostData => {
        const posts = dbPostData.map(post => 
        post.get({ plain: true }));
        res.render('createpost', { posts, loggedIn: true });
        })
        .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});


module.exports = router;