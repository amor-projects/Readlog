import { sanitzeInput } from './sanitizer.js';

async function fetchFromOpenLib (endpoint, query, res, extractFn = null) {
  query = sanitzeInput(query);
  try {
    const resp = await fetch(`${endpoint}${query}`);
    if (!resp.ok) {
      throw new Error(`External API Failed ${endpoint}${query}`)
    }
    if (extractFn) {
      const data = await resp.json()
      res.json(extractFn(data))
    } else {
      res.json(resp)
    }
  } catch(error) {
    res.json({
      failed: true,
      message: error.message,
      endpoint: endpoint,
      extractFn: Object.toString(extractFn),
      query: query
    })
  }
}

async function getTopWorks(authorId, limit = 10) {
  const resp = await fetch(
    `https://openlibrary.org/search.json` +
    `?author=${authorId}` +
    `&sort=editions` +
    `&limit=${limit}` +
    `&fields=key,title,cover_i,first_publish_year,edition_count,ratings_average,want_to_read_count`
  );
  const data = await resp.json();
  return extractSearchResults(data);
}

export {
  fetchFromOpenLib,
  getTopWorks
}