// set up express
const express = require('express')
const Article = require('./../models/article')
const article = require('./../models/article')
// get router, call router as a function to express
const router = express.Router()

// get a route at /articles/new
router.get('/new', (req, res) => {
  // renders new.ejs from articles folder, pass in new article (blank default article)
  res.render('articles/new', { article: new Article() })
})

router.get('/edit:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article:article })
})


// route for page with slash slug
router.get('/:slug', async (req, res) => {
  // find article through slug
  const article = await Article.findOne({ slug: req.params.slug })
  // if it can't find article => redirect back to home
  if (article == null) res.redirect('/')
  // render page that shows article & pass just created article
  res.render('articles/show', { article: article })
})

// when form is submitted for new article => this router.post is called
// post method saves article to database
router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

// put route
router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))


// create delete route
router.delete('/:id', async (req, res) => {
  // finds article by id and deletes it
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
  
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      console.log(e)
      res.render(`articles/${path}`, { article: article })
    }
  }
}

// need to export router in order to use it
module.exports = router

// where ever we require file => have access to router