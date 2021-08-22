const mongoose = require('mongoose');

const SlicedModel = new mongoose.Schema({
  name: String,
  printer: String,
  gcode: String,
  ownerId: String
});
  
module.exports = mongoose.model('models', SlicedModel);