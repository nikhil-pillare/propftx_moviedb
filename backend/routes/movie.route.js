const express = require('express');
const MovieRouter = express.Router();
const MovieModel= require('../models/movie.model')


MovieRouter.get('/', async (req, res) => {
  try {
    const Movies = await MovieModel.find();
    res.json(Movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


MovieRouter.post('/add', async (req, res) => {
    const { title, plot, genre, rating, year, poster } = req.body;
  const Movie = new MovieModel({
    title,
    plot,
    genre,
    rating,
    year,
    poster,
  });

  try {
    const newMovie = await Movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


MovieRouter.patch('/:id/update', async (req, res) => {
    const updateFields = req.body;
  
    try {
      const updatedMovie = await MovieModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateFields },
        { new: true }
      );
  
      if (!updatedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.json(updatedMovie);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


MovieRouter.delete('/:id/delete', async (req, res) => {
    try {
      const deletedMovie = await MovieModel.findByIdAndDelete(req.params.id);
  
      if (!deletedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = MovieRouter;