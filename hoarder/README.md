# Hoarder

My personal read-later list with AI-based automatic tagging and full text search.

- https://hoarder.app/
- https://github.com/hoarder-app/hoarder
- https://github.com/hoarder-app/hoarder/pkgs/container/hoarder
- https://gcr.io/zenika-hub/alpine-chrome
- https://hub.docker.com/r/getmeili/meilisearch

## Update Meilisearch

When updating Meilisearch, you must first export the data and then import it again.

```
% docker exec -it hoarder-meilisearch-1 sh
# curl -X POST 'http://localhost:7700/dumps' -H 'Authorization: Bearer API_KEY'
# curl -X GET 'http://localhost:7700/tasks/2504' -H 'Authorization: Bearer API_KEY'
# mv data.ms old_data.ms
```

```
% docker exec -it hoarder-meilisearch-1 sh
# meilisearch --import-dump dumps/XXX.dump --master-key="API_KEY"
# rm -rf dumps old_data.ms

% docker restart hoarder-meilisearch-1
```
