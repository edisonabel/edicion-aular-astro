// The public page and private preview compare the same six visible content fields.
// Featured placement and dates do not change whether the article text is live.
export const revisionSource = post => JSON.stringify(['slug','title','excerpt','content','image','imageAlt'].map(key=>post[key]||''));
export async function editorialRevision(post) {
  const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(revisionSource(post)));
  return [...new Uint8Array(bytes)].map(value=>value.toString(16).padStart(2,'0')).join('');
}
