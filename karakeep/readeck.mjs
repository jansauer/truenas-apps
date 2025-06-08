for await (const bookmark of readeckAll()) {
    console.log(`Creating ${bookmark.url}`);
    // console.log(bookmark);
    await karakeepCreate(bookmark.url, bookmark.created);
}

async function readeckPage(page) {
    const res = await fetch(`https://readeck.jansauer.dev/api/bookmarks?limit=100&offset=${page * 100}&sort=created`, {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer <TOKEN>"
        }
    });

    return res.json();
}

async function* readeckAll() {
    let page = 0;

    while (true) {
        const items = await readeckPage(page);
        if (items.length === 0) return;
        page++;
        for (const anItem of items) {
            yield anItem;
        }
    }
}

async function karakeepCreate(url, createdAt) {
    const res = await fetch("https://karakeep.jansauer.dev/api/v1/bookmarks", {
        method: "POST",
        headers: {
            "Authorization": "Bearer <TOKEN>",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: "link",
            url,
            createdAt,
        })
    });

    if (!res.ok) {
        console.error(await res.text());
        throw new Error("API Error");
    }
}
