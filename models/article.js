const mongoose = require('mongoose')
// markdown => HTML
const marked = require('marked')
// string => url friendly slug format
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)


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
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})

// function runs before we do validation on our article, every time we update/create/delete
articleSchema.pre('validate', function(next) {
  if (this.title) {
    // create slug from title (converted to lowercase & strict true to get rid of non-string characters)
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  if (this.markdown) {
    // marked() => converts markdown to html
    // sanitize() => gets rid of malicious code & escapes all HTML
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown))
  }

  next()
})

// export with module.exports => call mongoose model, pass name of model(chosen) & pass schema
module.exports = mongoose.model('Article', articleSchema)
// have table in database called 'Article' with 4 different columns specified above