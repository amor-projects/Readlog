import extractDescription from 'utils.js';
const OPEN_LIBRARY = 'https://openlibrary.org/';

async function getAuthor (key) {
  try {
    const resp = await fetch(`${OPEN_LIBRARY}${key}.json`);
    if (resp.ok) {
      const data = resp.json();
      return {
        name: data.name,
        birthDate: data.birthDate,
        photoId: photos?.[0],
        deathDate: data?.deathDate || null,
        bio: extractDescription(bio),
        links: data?.links || null,
        remoteIds: data?.remote_ids,
      }
    } else {
      throw new Error(`Failed to fetch author for key ${key}`)
    }
  } catch (error) {
    return {
      failed: true,
      message: error.message,
    }
  }
}

export default getAuthor;