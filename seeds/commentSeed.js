const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 2,
        post_text: "i'm so lost"
    }, {
        user_id: 2,
        post_id: 1,
        post_text: "how can I do this"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;