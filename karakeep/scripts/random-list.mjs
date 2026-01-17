/**
 * Karakeep Random List Generator
 */

import {
  fetchListSize,
  addBookmarkToList,
  fetchBookmarks,
  randomBookmark,
} from "./lib.mjs";

// const listId = "x0ly17l3swoffmax9nkjw8ro";
const listId = "mdhoxwqsofxwtle03cdf4y5j";
const targetSize = 10;

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
