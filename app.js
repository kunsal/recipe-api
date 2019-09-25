const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const Recipe = require('./models/recipe');

const app = express();

mongoose.connect('mongodb+srv://kunsal:63sBmH3MT5FUodeb@cluster0-qflzo.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('connected to MongoDB Atlas');
  }).catch(error => {
    console.log('Unable to conncet to MongoDB Atlas');
    console.error(error)
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/api/recipes', async (req, res, next) => {
  const { title, ingredients, instructions, difficulty, time } = req.body;
  try {
    const recipe = new Recipe({
      title, ingredients, instructions, difficulty, time
    });
    const saved = await recipe.save();
    if (!saved) {
      res.status(400).json({error: 'Error saving recipe!'});
    }
    res.status(201).json({message: 'Recipe created successfully!'});
  } catch (error) {
    res.status(400).json({ error })
  }
});

app.put('/api/recipes/:id', async (req, res, next) => {
  try {
    const { title, ingredients, instructions, difficulty, time } = req.body;
    const recipe = await Recipe.findOne({_id: req.params.id});

    if (!recipe) {
      res.status(404).send({ error: 'Recipe not found!' })
    } 
    
    recipe.title = title;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.difficulty = difficulty;
    recipe.time = time;

    const updated = await recipe.save();

    if (!updated) {
      res.status(400).json({error: 'Could not update recipe!'})
    }
    res.status(201).json({message: 'Recipe updated successfully!'});
  } catch(error) {
    res.status(400).json({ error })
  }
});

app.delete('/api/recipes/:id', async (req, res, next) => {
  try {
    const deleted = await Recipe.deleteOne({_id: req.params.id});
    if (!deleted) res.status(400).json({error: 'Could not delete recipe'})
    res.status(200).json({message: 'Recipe deleted successfully!'});
  } catch(error) {
    res.status(400).json({ error })
  }
});

app.get('/api/recipes/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({_id: req.params.id});
    if (!recipe) {
      res.status(404).send({ error: 'Recipe not found!' })
    } 
    res.status(200).json(recipe);
  } catch(error) {
    res.status(400).json({ error })
  }
});

app.get('/api/recipes', async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    if (!recipes) {
      res.status(404).json({error: 'No recipe found!'});
    }
    res.status(200).json(recipes)
  } catch (error) {
    console.log(error);
    res.status(400).json({error});
  }

})

module.exports = app;
