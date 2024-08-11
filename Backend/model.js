const mongoose = require('mongoose');
const schema = mongoose.Schema({
  EmpName: String,
  designation: String,
  empId: String,
  img_url: String,
});
// Create a model from the schema
const Post = mongoose.model('Post', schema);

// Export the model
module.exports = Post;
