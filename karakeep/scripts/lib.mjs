export async function* fetchBookmarks() {
  let cursor = undefined;

  while (true) {
    const { bookmarks, nextCursor } = await fetchBookmarksPage(cursor);

    for (const bookmark of bookmarks) {
      yield bookmark;
    }

    if (!nextCursor) break;
    cursor = nextCursor;
  }
}

async function fetchBookmarksPage(cursor) {
  const url = new URL(`${process.env.BASE_URL}/api/v1/bookmarks`);

  const params = new URLSearchParams();
  params.append("archived", "false");
  params.append("limit", "100");
  if (cursor) params.append("cursor", cursor);
  params.append("includeContent", "false");
  url.search = params.toString();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch bookmarks: ${response.status} ${response.statusText}`,
    );
    console.error(await response.text());
  }

  return await response.json();
}

export async function fetchListSize(listId) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/v1/lists/${listId}/bookmarks`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    console.error(
      `Failed to fetch list size: ${response.status} ${response.statusText}`,
    );
    console.error(await response.text());
  }

  const data = await response.json();

  return data.bookmarks.length;
}

export async function addBookmarkToList(listId, bookmarkId) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/v1/lists/${listId}/bookmarks/${bookmarkId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({ bookmarkId: bookmarkId }),
    },
  );

  if (!response.ok) {
    console.error(
      `Failed to add bookmark to list: ${response.status} ${response.statusText}`,
    );
    console.error(await response.text());
  }
}

export function randomBookmark(bookmarks) {
  return bookmarks[Math.floor(Math.random() * bookmarks.length)];
}
