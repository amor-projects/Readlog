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