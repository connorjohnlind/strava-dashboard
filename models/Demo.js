const mongoose = require('mongoose');

const { Schema } = mongoose;

const demoSchema = new Schema({
  data: String,
});

mongoose.model('demo', demoSchema);
