const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()

app.set('view engine', 'ejs')

// articles.js based on this route
app.use("/articles", articleRouter)

app.get('/', (req, res) => {
  const articles = [{
    title: 'Test Article',
    createdAt: new Date(),
    description: 'Test description'
  },
  {
    title: 'Test Article 2',
    createdAt: new Date(),
    description: 'Test description 2'
  }]

  res.render('articles/index', { articles: articles })
})
app.listen(3000)         