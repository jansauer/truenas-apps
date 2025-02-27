
for await (const bookmark of list()) {

    if (bookmark.content.type === "link") {
        console.log(`Reading ${bookmark.id}`)
        await create({
            url: bookmark.content.url,
            title: bookmark.content.title || "",
        });

    } else {
        console.log(`Skipping ${bookmark.id}`);
    }
}

async function sss(cursor) {
    const query = cursor ? `cursor=${cursor}` : "";
    const res = await fetch(`https://hoarder.jansauer.dev/api/v1/bookmarks?${query}`, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer ak1_cf75f31b6af057726356_7feccc9e747b1d649f52"
        }
    });

    return res.json();
}

async function* list() {
    let nextCursor;
    do {
        const page = await sss(nextCursor);
        nextCursor = page.nextCursor;

        for (const bookmark of page.bookmarks) {
            yield bookmark;
        }
    } while (!!nextCursor);
}

async function create(payload) {
    const res = await fetch("https://readeck.jansauer.dev/api/bookmarks", {
        method: "POST",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJLVWdURjRwVmNOWWN2WHJjdTV3a1JWIn0.udlSK5jwhxzlZvJytenfjoLtN19sTxheaiyXuxqtlStB-Rxt3kZKiq3bvUOr-GUPnJylORjVd9tkHYkvRt3rCg",
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        console.error(await res.text());
        throw new Error("API Error");
    }
}
