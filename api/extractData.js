import {generateRemoteLinks, sanitzeOutput} from './utils.js'
function extractDescription(desc) {
  if (!desc) return "";
  if (typeof desc === 'string') return desc;
  if (desc !== null && typeof desc === 'object' && desc.value) return desc.value;
}

function extractId(key) {
  return key ? key.slice(key.lastIndexOf('/') + 1) : null;
}

function extractSearchResults(data) {
  const results = data?.docs || data.works;
  return results.map(work => ({
    key:             extractId(work.key),
    title:           work.title,
    authorsNames:    work.author_name,
    authorsIds:      work.author_key,
    cover:           work.cover_i,
    firtPublishYear: work.first_publish_year,
    rating:          work.ratings_average?.toFixed(2),
    wantToRead:      work.want_to_read_count,
  }))
}

function extractAuthorIds(authors) {
  const authorsIdsList = [];
  for (const item of authors) {
    authorsIdsList.push(extractId(item?.author.key || item.key))
  }
  return authorsIdsList;
}
function extractWork (work) {
  return sanitzeOutput ({
    title:            work.title,
    authors:          work.authors && extractAuthorIds(work.authors),
    key:              extractId(work.key),
    firstPublishDate: work.first_publish_date,
    description:      extractDescription(work.description),
    subjects:         work.subjects && work.subjects.slice(0, 5),
    characters:       work?.subject_people || null,
    externalLinks:    work?.links || null,
    covers:           work?.covers || null
  })
}

function extractEdition (edition) {
  return sanitzeOutput ({
    title:       edition.title,
    authors:     edition.authors && extractAuthorIds(edition.authors),
    key:         extractId(edition.key),
    publishDate: edition.publish_date,
    isbn_10:     edition?.isbn_10,
    isbn_13:     edition.isbn_13,
    publisher:   edition.publishers, 
    pages:       edition?.number_of_pages,
    covers:      edition?.covers || null,
  })
}

function extractAuthor(author) {
  const id = extractId(author.key);
  return  sanitzeOutput ({
    name:            author.name,
    birthDate:       author.birth_date,
    key:             id,
    deathDate:       author?.death_date || null,
    bio:             extractDescription(author.bio),
    photo:           author?.photos?.[0] || null,
    thirdPartyLinks: generateRemoteLinks(author.remote_ids)
  })
}

function extractGutenBook (book) {
  if (!book) {
    return {
      failed: true,
      message: 'Book Not Found'
    }
  }
  return {
    id:       book.id,
    title:    book.title,
    authors:  book?.authors && book.authors.map(a => a.name),
    cover:    book.formats && book.formats['image/jpeg'],         
    epub:     book.formats && book.formats['application/epub+zip'],
    subjects: book.subjects,  
  }
}

function extractGutenResults (data, limit = 10) {
  const results = data?.results?.slice(0, limit);
  return results ? results.map(book => (extractGutenBook(book))) : {failed: true, message: `Found Nothing`};
}

export {
  extractWork,
  extractAuthor,
  extractEdition,
  extractSearchResults,
  extractGutenBook, 
  extractGutenResults,
}