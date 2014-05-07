var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Mixed = Schema.Types.Mixed;

//Define submissions schema and model
var announcementsSchema = Schema({
  title: String,
  content: String,
  date: Date
});
var announcements = mongoose.model('announcements', announcementsSchema);

module.exports = announcements;