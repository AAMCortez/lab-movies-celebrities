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

router.get("/movies/:id", async (req, res, next) => {
   try {
      const { id } = req.params;
      const movies = await Movies.findById(id).populate("cast");
      const celebrities = await Celebrity.find();
      const { _id, title, genre, plot, cast } = movies;
      res.render("movies/movie-details", {
         _id,
         title,
         genre,
         plot,
         cast,
      });
   } catch (error) {
      next(error);
   }
});

router.post("/movies/:id/delete", async (req, res, next) => {
   try {
      const { id } = req.params;
      await Movies.findByIdAndDelete(id);
      res.redirect("/movies");
   } catch (error) {
      next(error);
   }
});

router.get("movies/:id/edit", async (req, res, next) => {
   try {
      const { id } = req.params;
      await Movies.findById(id);
      await Celebrity.find();
      res.render("/movies/edit-movie");
   } catch (error) {
      next(error);
   }
});

router.post("/movies/:id/edit", async (req, res, next) => {
    try {
       const { id } = req.params;
       const { _id, title, genre, plot, cast } = req.body;
       const updatedMovie = await Movies.findByIdAndUpdate(id, {
        title,
        genre,
        plot,
        cast
       });
       res.redirect(`/movies/${updatedMovie}`);
    } catch (error) {
       next(error);
    }
 });

module.exports = router;
