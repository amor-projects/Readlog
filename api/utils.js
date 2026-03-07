import {JSDOM} from 'jsdom';
import DOMPurify from 'dompurify';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

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

export {sanitzeInput, sanitzeOutput}
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

export { generateRemoteLinks, sanitzeInput, sanitzeOutput}