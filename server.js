// imports the server
const express = require('express')
// require mongoose library so that we can connect our database
const mongoose = require('mongoose')
// article model to access articles
const Article = require('./models/article')
// allows article router from articles.js
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
// will call express with app variable
const app = express()

mongoose.connect('mongodb://localhost:27017/blog', {
  useUnifiedTopology: true, useNewUrlParser: true 
})



// setups view engine to 'ejs' (will be writing all of our views using ejs => our view engine converts ejs to HTML)
app.set('view engine', 'ejs')

// access all diff parameters from our article form inside of article route with 'req.body'
app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

// create index/main route
app.get('/', async (req, res) => {
  // gets every article, sorted in descending order
  const articles =  await Article.find().sort({ createdAt: 'desc'})
  
  // pass an object to render => pass articles to index (main page articles)
  // rendering index.ejs from views/articles
  res.render('articles/index', { articles: articles })
})

// tell app to use articleRouter at /articles
// every route we create in articleRouter will be added to end of /articles
app.use("/articles", articleRouter)

// start application in port 3000
app.listen(3000)         