const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//route for get
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        })
});

//route for get by id
router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
          id: req.params.id
        }
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
});

//route for post
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
          })
          .then(dbCommentData => res.json(dbCommentData))
          .catch(err => {
             console.log(err);
             res.status(400).json(err);
          })
    }
});

//route for update
router.put('/:id', withAuth, (req, res) => {
  Comment.update({
      comment_text: req.body.comment_text
  }, {
      where: {
          id: req.params.id
      }
  }).
  then(dbCommentData => {
      if (!dbCommentData) {
          res.status(404).json({ message: 'Unable to find comment' });
          return;
      }
      res.json(dbCommentData);
  }).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

//route for delete
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id,
      }
  })
    .then(dbCommentData => {
    if (!dbCommentData) {
        res.status(404).json({ message: 'Unable to find comment' });
        return;
    }
    res.json(dbCommentData);
  }).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;