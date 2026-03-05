import { sanitzeInput, sanitzeOutput } from './sanitizer.js';
// API Endpoints
const OPEN_LIBRARY_SEARCH = 'https://openlibrary.org/search.json?q';
const BOOKS_COVER_API = 'https://covers.openlibrary.org/b/';

function extractBook(bookData) {
  return {
    title: bookData.title,
    authors: bookData.author_name,
    authorKeys: bookData.author_key,
    coverId: bookData.cover_i,
    coverURL: `${BOOKS_COVER_API}id/${bookData?.cover_i}-M.jpg`,
    editionKey: bookData?.cover_edition_key,
    gutenbergId: bookData?.id_project_gutenberg || null,
  }
}

async function getStructuredWorks (rawData, limit) {
  const respLength = rawData.numFound > limit ? limit : numFound;
  const structuredData = {found: rawData.numFound, received: respLength, books: []};
    for (let i = 0; i < respLength; i ++) {
      const bookData = rawData?.docs[i];
      structuredData.books.push(extractBook(bookData));
    }
  return structuredData;
}

async function searchWorks(type, input, res, limit) {
  if (!limit || typeof limit !== 'number') limit = 10;
  const safeInput = sanitzeInput(input);
  const url = `${OPEN_LIBRARY_SEARCH}${type}=${safeInput}&limit=${limit}`;
  try {
    const resp = await fetch(`${url}`)
    if (resp.ok) {
      const rawData = await resp.json();
      if (rawData.numFound === 0) {
        res.json({
          found: 0,
          message: `Oops! We found nothing for "${keywords}"`
        });
        return false;
      }
      const bookData = await getStructuredWorks(rawData, limit);
      res.json(bookData);
    } else {
      throw new Error(`Error fetching data from ${url}`);
    }
  } catch (error) {
    res.json({
      failed: true,
      message: error.message,
    })
    console.log(error)
    return false;
  }
}

export {searchWorks};