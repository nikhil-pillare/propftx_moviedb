const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: {
    type: String

  },
  title: {
    type: String

  },
  plot: {
    type: String

  },
  genre: {
    type: String

  },
  rating: {
    type: Number
  },
  year: {
    type : Number
  },
  poster:{
    type : String
  }
});

const MovieModel = mongoose.model('Moviedb', movieSchema);

module.exports = MovieModel;