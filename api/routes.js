import express from 'express';
import {searchWorks } from './search.js'
const port = 3000;

const app = express();

app.get('/search', async (req, res) => {
  const { keywords, title, author, isbn , limit = 10} = req.query;
  if (typeof limit !== 'number') limit = 10;
  if (keywords) {
    searchWorks('', keywords, res);
  } else if (title) {
    searchWorks('title',title, res );
  }
  else if (author) {
    searchWorks('author', author, res)
  }
  else if (isbn) {
    searchWorks('isbn', isbn, res)
  } else {
    res.json({
      failed: true,
      message: `Invalid request: ${req.query}`
    })
  };
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
})