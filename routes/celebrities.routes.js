const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
   try {
      res.render("celebrities/new-celebrity");
   } catch (error) {
      next(error);
   }
});

router.post("/celebrities/create", async (req, res, next) => {
   try {

      const { name, occupation, catchPhrase } = req.body;
      const createdCeleb = await Celebrity.create({
         name,
         occupation,
         catchPhrase,
      });
      console.log("A new celebrity was created:", createdCeleb.name);
      res.redirect("/celebrities");
   } catch (error) {
      next(error);
   }
});

router.get("/celebrities", async (req, res, next) => {
   try {
      const allCelebs = await Celebrity.find();
      res.render("celebrities/celebrities", { celebs: allCelebs });
   } catch (error) {
      // calling the error middleware
      next(error);
   }
});

module.exports = router;
