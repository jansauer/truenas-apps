# TrueNAS Apps

```
$ docker context create truenas \
    --description "TrueNAS" \
    --docker "host=ssh://truenas"
```

```
$ cd app
$ docker context use truenas
$ docker compose --env-file=.env up -d
```

docker ps --format 'table {{ .Names }}\t{{ .ID }}\t{{ .Image }}\t{{ .Status }}' | sort

- [Bright Sky](./brightsky)
- [Immich](./immich)
- [Jellyfin](./jellyfin)
- [Overpass](./overpass)
- [Paperless-ngx](./paperless-ngx)
- [Plex](./plex)
- [Traefik](./traefik)

## Things I tried but no longer use

- [Beaver Habit Tracker](https://github.com/jansauer/truenas-apps/commit/85c5082a5e24f5dd7842b9361773f322ffc7c057)
- [Dockge](https://github.com/jansauer/truenas-apps/commit/163b23a51de3ec839bff9f35eebbb03a81ef795f)
- [Hoarder](https://github.com/jansauer/truenas-apps/blob/1a8e0e5c252a3c12a75373f932ef0ef964dfccc1/hoarder/README.md)
