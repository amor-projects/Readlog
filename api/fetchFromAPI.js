import { sanitzeInput, POSTFIX } from './utils.js';

async function fetchFromAPI (endpoint, query, res, extractFn = null) {
  try {
    const resp = await fetch(`${endpoint}${query}`, {
      headers: {
        "User-Agent": "ReadLog/1.0 amorzephyr@gmail.com"
      }
    });
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
    `${POSTFIX}`
  );
  const data = await resp.json();
  return extractSearchResults(data);
}

export {
  fetchFromAPI,
  getTopWorks
}