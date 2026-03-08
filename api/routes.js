import express from 'express';
import path from 'path';
import getImage from './getImage.js';
import { fetchFromAPI } from './fetchFromAPI.js';
import { extractWork, extractAuthor, extractEdition, extractSearchResults, extractGutenResults } from './extractData.js';
import { GUTENBERG_SHELVES, shelfUrl, createSearchURL, sanitzeInput } from './utils.js';

const GUTTENDEX = 'https://gutendex.com/books/?search=';
const OPEN_LIBRARY_MAIN = 'https://openlibrary.org';
const AUTHORS = `${OPEN_LIBRARY_MAIN}/authors/`;
const EDITIONS_BY_ID = `${OPEN_LIBRARY_MAIN}/books/`;
const EDITIONS_BY_ISBN = `${OPEN_LIBRARY_MAIN}/isbn/`;
const WORKS = `${OPEN_LIBRARY_MAIN}/works/`;
const TRENDING = `${OPEN_LIBRARY_MAIN}/trending/`;
const SUBJECTS = `${OPEN_LIBRARY_MAIN}/subjects/`

const app = express();

app.use('/openlibraryimages', express.static(path.join(import.meta.dirname, 'public')));

app.get('/api/edition', (req, res) => {
  const {id, isbn} = req.query;
  const query = id ? `${id}.json`: `${isbn}.json`;
  const endpoint = id ? EDITIONS_BY_ID : EDITIONS_BY_ISBN;
  fetchFromAPI(endpoint, query, res, extractEdition);
})

app.get('/api/author', (req, res) => {
  const {id} = req.query;
  const query = `${id}.json`;
  fetchFromAPI(AUTHORS, query, res, extractAuthor);
})

app.get('/api/work', (req, res) => {
  const {id} = req.query;
  let query = `${id}.json`;
  fetchFromAPI(WORKS, query, res, extractWork);
})

app.get('/api/image', async (req, res) => {
  const {type, id} = req.query;
  const resp = await getImage(type,id);
  res.json(resp);
})

app.get('/api/trending', (req, res) => {
  const { duration, limit } = req.query;
  let query = duration ? `${duration}.json` : 'weekly.json';
  if (limit) {
    query = `${query}?limit=${limit}`;
  }
  else {
     query = `${query}?limit=10`;
  }
  fetchFromAPI(TRENDING, query, res, extractSearchResults)
})

app.get('/api/subject', (req, res) => {
  const {q} = req.query;
  let query = q ? `${q}.json` : 'fiction.json';
  fetchFromAPI(SUBJECTS, query, res, extractSearchResults)
})

app.get('/api/search', async (req, res) => {
  const {q, title, author, isbn , limit} = req.query;
  let type;
  let value;
  if (title) {
    type = 'title';
    value = title;
  } else if (author) {
    type = 'author';
    value = author;
  } else if (isbn) {
    type = 'isbn';
    value = isbn;
  } else {
    type = 'q'
    value = q;
  }
  value = sanitzeInput(value);
  const lim = limit || 10;
  const query = createSearchURL(type, value, lim)
  fetchFromAPI('', query, res, extractSearchResults);
})

app.get('/api/freebook', (req, res) => {
  const q = req.query.q;
  fetchFromAPI(GUTTENDEX,q, res, extractGutenResults );
})
app.get('/api/freeshelve', (req, res) => {
  const {topic, limit} = req.query;
  const query = shelfUrl(topic, limit);
  fetchFromAPI('', query, res, extractGutenResults)
})

export default app;