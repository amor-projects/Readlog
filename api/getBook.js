import { extractDescription, getListOf } from 'utils.js';
import getAuthor from './getAuthor.js';
const OPEN_LIBRARY = 'https://openlibrary.org/';

function extractBook(data) {
  return {
    title: data.title,
    authors: getListOf(getAuthor, 'name', data.authors),
    description: extractDescription(data),
    firstPublishDate: data?.first_publish_date,
    // slice will fallback to subjects.length if subjects are less then 5.
    subjects: data?.subjects.slice(0, 5), 
    links: data?.links
  }
}
async function getBook(key) {
  if (!prevData) {
    
  }
  let bookURL = `${OPEN_LIBRARY}/works/${key}.json`
  if (key.startsWith('/works/')) {
    bookURL = `${OPEN_LIBRARY}${key}.json`
  }
  try {
    const resp = await fetch(bookURL);
    if (resp.ok) {
      const data = await resp.json();
      return extractBook(prevData, data);
    } else {
      throw new Error(`Failed to fetch book for key ${key}`);
    } 
    }
    catch (error) {
      return {
        failed: true,
        message: error.message,
      }
    }
}

export default getBook;