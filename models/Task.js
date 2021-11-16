const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String
  },
  note: {
    type: String
  },
  type: {
    type: String
  },
  user: {
    type: Object
  },
});

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;