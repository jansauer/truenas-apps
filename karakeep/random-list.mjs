/**
 * Karakeep Random List Generator
 * export BASE_URL=https://karakeep.jansauer.dev/
 * export API_KEY=
 */

import {
  fetchListSize,
  addBookmarkToList,
  fetchBookmarks,
  randomBookmark,
} from "./lib.mjs";

 const listId = "tzi5sd6bmuits4dv54jfvkhs";
// const listId = "qppd47it2dzhmm5996mf0m25";
// const listId = "nm9wxo1ltg2x3kqsnwam8mva";
// const listId = "vf8lrm11gvaju6hmyxbgd0ca";
// const listId = "pmx35tu7tuahm7bhwqrw5cfr";
const targetSize = 30;

if (!process.env.BASE_URL) {
  console.error("Missing BASE_URL environment variable.");
  process.exit(1);
}

if (!process.env.API_KEY) {
  console.error("Missing API_KEY environment variable.");
  process.exit(1);
}

const bookmarks = [];
for await (const bookmark of fetchBookmarks()) {
  bookmarks.push(bookmark.id);
}

console.log(`Found ${bookmarks.length} bookmarks`);

const size = await fetchListSize(listId);
console.log(`List size: ${size}`);

for (let i = 0; i < targetSize - size; i++) {
  const random = randomBookmark(bookmarks);
  await addBookmarkToList(listId, random);
  console.log(`Added ${random} to list`);
}
