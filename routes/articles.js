// set up express
const express = require('express')
const Article = require('./../models/article')
// get router, call router as a function to express
const router = express.Router()

// get a route at /articles/new
router.get('/new', (req, res) => {
  // renders new.ejs from articles folder
  res.render('articles/new')
})



// when form is submitted for new article => this router.post is called
// post method saves article to database
router.post('/', async (req, res) => {
  // console.log(res)
  
  // create a new article, pass it all our diff options
  // object for article schema
  const article = new Article( {
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown

  })

  // save new article
  await article.save()
})

// need to export router in order to use it
module.exports = router

// where ever we require file => have access to router