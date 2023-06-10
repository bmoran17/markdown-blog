const mongoose = require('mongoose')

// schema sets what data will be in database
// blueprint of how data will look (data structure)

// need to pass it all the options/columns our new article has
// specify options for all columns
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// export with module.exports => call mongoose model, pass name of model(chosen) & pass schema
module.exports = mongoose.model('Article', articleSchema)
// have table in database called 'Article' with 4 different columns specified above