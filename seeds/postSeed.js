const { Post } = require('../models');

const postData = [
    {
        title: "Built my first PC",
        post_text: "Finally got the new GPU that has a million tflops of power",
        user_id: 1
    },{
        title: "I took an arrow to the knee", 
        post_text: "This isn't the first time I took an arrow to the knee",
        user_id: 2
    },{
        title: "Announcing the Banana Phone", 
        post_text: "The perfect phone for when you're hungry since you can just peal it and eat it.",
        user_id: 3
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;