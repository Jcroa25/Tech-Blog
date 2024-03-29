const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get comments
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        })
});

//get comment
router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
          id: req.params.id
        }
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//post comment
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

//edit comment
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
    res.status(500).json(err);
  });
});

//delete comment
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
    res.status(500).json(err);
  });
});

module.exports = router;