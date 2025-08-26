# Karakeep

My personal read-later list with AI-based automatic tagging and full text search.

- https://karakeep.app/
- https://github.com/karakeep-app/karakeep
- https://github.com/hoarder-app/hoarder/pkgs/container/hoarder
- https://gcr.io/zenika-hub/alpine-chrome
- https://hub.docker.com/r/getmeili/meilisearch

## Update Meilisearch

When updating Meilisearch, you must first export the data and then import it again.

```
Create a dump
% docker exec -it karakeep-meilisearch-1 sh
# curl -X POST -H 'Authorization: Bearer API_KEY' 'http://localhost:7700/dumps'
# curl -X GET  -H 'Authorization: Bearer API_KEY' 'http://localhost:7700/tasks/ID'
```

```
After starting the new version
% docker exec -it karakeep-meilisearch-1 sh
# mv data.ms old_data.ms
# meilisearch --import-dump dumps/XXX.dump --master-key="API_KEY"
# rm -rf dumps old_data.ms
% docker restart karakeep-meilisearch-1
```

```
Check the number of documents
# curl -H 'Authorization: Bearer API_KEY' 'http://localhost:7700/indexes/bookmarks/documents?limit=1'
```
