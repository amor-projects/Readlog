import express from 'express';
import path from 'path';
import getImage from './getImage.js';
import { fetchFromAPI } from './fetchFromAPI.js';
import { extractWork, extractAuthor, extractEdition, extractSearchResults } from './extractData.js';

const OPEN_LIBRARY_MAIN = 'https://openlibrary.org';
const SEARCH = `${OPEN_LIBRARY_MAIN}/search.json?q=`;
const SEARCH_BY_TITLE = `${OPEN_LIBRARY_MAIN}/search.json?title=`;
const SEARCH_BY_AUTHOR = `${OPEN_LIBRARY_MAIN}/search.json?author=`;
const SEARCH_BY_ISBN  = `${OPEN_LIBRARY_MAIN}/search.json?isbn=`;
const AUTHORS = `${OPEN_LIBRARY_MAIN}/authors/`;
const EDITIONS_BY_ID = `${OPEN_LIBRARY_MAIN}/books/`;
const EDITIONS_BY_ISBN = `${OPEN_LIBRARY_MAIN}/isbn/`;
const WORKS = `${OPEN_LIBRARY_MAIN}/works/`;
const TRENDING = `${OPEN_LIBRARY_MAIN}/trending/`;
const SUBJECTS = `${OPEN_LIBRARY_MAIN}/subjects/`
const port = 3000;

const app = express();

app.use('/openlibraryimages', express.static(path.join(import.meta.dirname, 'public')));

app.get('/edition', (req, res) => {
  const {id, isbn} = req.query;
  const query = id ? `${id}.json`: `${isbn}.json`;
  const endpoint = id ? EDITIONS_BY_ID : EDITIONS_BY_ISBN;
  fetchFromAPI(endpoint, query, res, extractEdition);
})

app.get('/author', (req, res) => {
  const {id} = req.query;
  const query = `${id}.json`;
  fetchFromAPI(AUTHORS, query, res, extractAuthor);
})

app.get('/work', (req, res) => {
  const {id} = req.query;
  let query = `${id}.json`;
  fetchFromAPI(WORKS, query, res, extractWork);
})

app.get('/image', async (req, res) => {
  const {type, id} = req.query;
  const resp = await getImage(type,id);
  res.json(resp);
})

app.get('/trending', (req, res) => {
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

app.get('/subject', (req, res) => {
  const {q} = req.query;
  let query = q ? `${q}.json` : 'fiction.json';
  fetchFromAPI(SUBJECTS, query, res, extractSearchResults)
})

app.get('/search', async (req, res) => {
  const que = req.query
  const {q, title, author, isbn , limit} = que;
  let endpoint = SEARCH;
  let query;
  if (title) {
    query = title;
    endpoint = SEARCH_BY_TITLE;
  } else if (author) {
    query = author;
    endpoint = SEARCH_BY_AUTHOR;
  } else if (isbn) {
    query = isbn;
    endpoint = SEARCH_BY_ISBN;
  } else {
    query = q;
    endpoint = SEARCH;
  }
  if (limit) {
    query = `${query}&limit=${limit}`;
  } else {
    query = `${query}&limit=10`
  }
  fetchFromAPI(endpoint, query, res, extractSearchResults);
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
})