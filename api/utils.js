import {JSDOM} from 'jsdom';
import DOMPurify from 'dompurify';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const OPEN_LIBRARY_MAIN = 'https://openlibrary.org';
const SEARCH = `${OPEN_LIBRARY_MAIN}/search.json?q=`;
const SEARCH_BY_TITLE = `${OPEN_LIBRARY_MAIN}/search.json?title=`;
const SEARCH_BY_AUTHOR = `${OPEN_LIBRARY_MAIN}/search.json?author=`;
const SEARCH_BY_ISBN  = `${OPEN_LIBRARY_MAIN}/search.json?isbn=`;
const POSTFIX = '&fields=key,title,author_name,author_key,cover_i,first_publish_year,ratings_average,want_to_read_count,'

function sanitzeInput(query) {
  if (typeof query !== 'string') return '';

  return query
    .trim()
    .slice(0, 200)
    .replace(/[+\-&|!(){}[\]^"~*?:\\]/g, "\\$&")
    .replace(/\s/g, ' ');
}

function sanitzeOutput(data) {
  const clean =  (obj) => {
    if (typeof obj === 'string') {
      return purify.sanitize(obj);
    }
    if (Array.isArray(obj)) {
      return obj.map(clean);
    }
    if (obj !== null && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([key, val]) => [key, clean(val)])
      );
    }
    return obj
  }
  return clean(data);
}

function generateRemoteLinks(ids) {
  return {
    ...(ids?.viaf && { viaf: `https://viaf.org/viaf/${ids.viaf}` }),
    ...(ids?.goodreads && { goodreads: `https://www.goodreads.com/author/show/${ids.goodreads}` }),
    ...(ids?.amazon && { amazon: `https://www.amazon.com/dp/${ids.amazon}` }),
    ...(ids?.isni && { isni: `https://isni.org/isni/${ids.isni}` }),
    ...(ids?.librivox && { librivox: `https://librivox.org/author/${ids.librivox}` }),
    ...(ids?.project_gutenberg && { gutenberg: `https://www.gutenberg.org/ebooks/author/${ids.project_gutenberg}` }),
    ...(ids?.librarything && { librarything: `https://www.librarything.com/author/${ids.librarything}` }),
    ...(ids?.wikidata && { wikidata: `https://www.wikidata.org/wiki/${ids.wikidata}` }),
    ...(ids?.bookbrainz && { bookbrainz: `https://bookbrainz.org/author/${ids.bookbrainz}` }),
    ...(ids?.musicbrainz && { musicbrainz: `https://musicbrainz.org/artist/${ids.musicbrainz}` }),
    ...(ids?.imdb && { imdb: `https://www.imdb.com/name/${ids.imdb}` }),
    ...(ids?.lc_naf && { loc: `https://id.loc.gov/authorities/names/${ids.lc_naf}.html` }),
  };
}

function createSearchURL(type, value, limit) {
  let prefix;
  if (type === 'title') {
    prefix = SEARCH_BY_TITLE;
  } else if (type === 'author') {
    prefix = SEARCH_BY_AUTHOR;
  } else if (type === 'isbn') {
    prefix = SEARCH_BY_ISBN;
  } else {
    prefix = SEARCH;
  }
  return `${prefix}${value}&limit=${limit}${POSTFIX}`;
}

const GUTENBERG_SHELVES = [
  { id: 1,  label: "Adventure",            topic: "adventure" },
  { id: 2,  label: "Science Fiction",      topic: "science fiction" },
  { id: 3,  label: "Detective Fiction",    topic: "detective fiction" },
  { id: 4,  label: "Horror",               topic: "horror" },
  { id: 5,  label: "Mystery",              topic: "mystery" },
  { id: 6,  label: "Romance",              topic: "love stories" },
  { id: 7,  label: "Historical Fiction",   topic: "historical fiction" },
  { id: 8,  label: "Children's",           topic: "children" },
  { id: 9,  label: "Poetry",               topic: "poetry" },
  { id: 10, label: "Drama",                topic: "drama" },
  { id: 11, label: "Short Stories",        topic: "short stories" },
  { id: 12, label: "Philosophy",           topic: "philosophy" },
  { id: 13, label: "Mythology",            topic: "mythology" },
  { id: 14, label: "Biography",            topic: "biography" },
  { id: 15, label: "Humour",               topic: "humor" },
  { id: 16, label: "Western",              topic: "western stories" },
  { id: 17, label: "Travel",               topic: "travel" },
  { id: 18, label: "War",                  topic: "war stories" },
  { id: 19, label: "Gothic Fiction",       topic: "gothic fiction" },
  { id: 20, label: "Fairy Tales",          topic: "fairy tales" },
  { id: 21, label: "Fables",               topic: "fables" },
  { id: 22, label: "Folklore",             topic: "folklore" },
  { id: 23, label: "Ghost Stories",        topic: "ghost stories" },
  { id: 24, label: "Spy Stories",          topic: "spy stories" },
  { id: 25, label: "Sea Stories",          topic: "sea stories" },
  { id: 26, label: "Pirate Stories",       topic: "pirates" },
  { id: 27, label: "Epistolary Fiction",   topic: "epistolary fiction" },
  { id: 28, label: "Satire",               topic: "satire" },
  { id: 29, label: "Political Science",    topic: "political science" },
  { id: 30, label: "Economics",            topic: "economics" },
  { id: 31, label: "Psychology",           topic: "psychology" },
  { id: 32, label: "Religion",             topic: "religion" },
  { id: 33, label: "Norse Mythology",      topic: "norse mythology" },
  { id: 34, label: "Greek Mythology",      topic: "classical mythology" },
  { id: 35, label: "Arthurian Legends",    topic: "arthurian romances" },
  { id: 36, label: "Morality Tales",       topic: "morality" },
  { id: 37, label: "Natural History",      topic: "natural history" },
  { id: 38, label: "Astronomy",            topic: "astronomy" },
  { id: 39, label: "Mathematics",          topic: "mathematics" },
  { id: 40, label: "Medicine",             topic: "medicine" },
  { id: 41, label: "Architecture",         topic: "architecture" },
  { id: 42, label: "Art",                  topic: "art" },
  { id: 43, label: "Music",                topic: "music" },
  { id: 44, label: "Cooking",              topic: "cooking" },
  { id: 45, label: "Games & Puzzles",      topic: "games" },
  { id: 46, label: "Animals",              topic: "animals" },
  { id: 47, label: "Exploration",          topic: "explorers" },
  { id: 48, label: "Letters",              topic: "correspondence" },
  { id: 49, label: "Essays",               topic: "essays" },
  { id: 50, label: "Utopian Fiction",      topic: "utopias" },
];

const shelfUrl = (topic, lang = "en") =>
  `https://gutendex.com/books/?topic=${encodeURIComponent(topic)}&languages=${lang}`;

export { 
  generateRemoteLinks, 
  sanitzeInput, 
  sanitzeOutput, 
  createSearchURL,
  shelfUrl,
  GUTENBERG_SHELVES, 
  POSTFIX,
}