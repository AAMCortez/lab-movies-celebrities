const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movies = require("../models/Movies.model");

router.get("/movies/create", async (req, res, next) => {
   try {
    const allCelebrities = await Celebrity.find();
      res.render("movies/new-movie");
   } catch (error) {
      next(error);
   }
});

router.post("/movies/create", async (req, res, next) => {
   try {
      const { title, genre, plot, cast } = req.body;
      const createdMovie = await Movies.create({
         title,
         genre,
         plot,
         cast,
      });
      console.log("A new Movie was created:", createdMovie.title);
      res.redirect("/movies");
   } catch (error) {
      next(error);
   }
});

router.get("/movies", async (req, res, next) => {
   try {
      const allMovies = await Movies.find();
      res.render("movies/movies", { movies: allMovies });
   } catch (error) {
      next(error);
   }
});

module.exports = router;
