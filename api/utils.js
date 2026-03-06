function extractDescription(desc) {
  if (!desc) return "";
  if (typeof desc === 'string') return desc;
  if (desc !== null && typeof desc === 'object' && desc.value) return desc.value;
}

async function getListOf (fn, field, list) {
  const newList = [];
  for (let item of list) {
    try {
      const resp = await fn(item);
      if (resp.ok) newList.push(resp?.[field]);
      else throw new Error(`Failed to fetch ${list}`);
    } catch(error) {
      return {
        failed: true,
        message: error.message,
      }
    }
  }
  return newList;
}

export {extractDescription, getListOf}